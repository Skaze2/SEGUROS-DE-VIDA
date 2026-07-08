import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { PanelLeftClose, PanelLeftOpen, ShieldCheck } from 'lucide-react'
import { SECTIONS } from '@/app/sections'
import { SidebarItem } from '@/components/layout/SidebarItem'
import { UserFooter } from '@/components/layout/UserFooter'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const STORAGE_KEY = 'sidebar-collapsed'

interface SidebarProps {
  activeSectionId: string
  onSelectSection: (id: string) => void
}

export function Sidebar({ activeSectionId, onSelectSection }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) return stored === '1'
    // En pantallas pequeñas arranca contraído (mobile-first)
    return window.innerWidth < 768
  })

  const toggle = () => {
    setCollapsed((prev) => {
      localStorage.setItem(STORAGE_KEY, prev ? '0' : '1')
      return !prev
    })
  }

  const toggleButton = (
    <button
      onClick={toggle}
      aria-label={collapsed ? 'Expandir menú' : 'Contraer menú'}
      className="flex size-9 shrink-0 items-center justify-center rounded-lg text-text-secondary transition-colors duration-200 hover:bg-white/5 hover:text-foreground"
    >
      {collapsed ? <PanelLeftOpen className="size-4.5" /> : <PanelLeftClose className="size-4.5" />}
    </button>
  )

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className="flex h-full shrink-0 flex-col overflow-hidden border-r border-white/10 bg-card-bg/60 backdrop-blur-xl"
    >
      {/* Logo + toggle */}
      <div className={`flex items-center gap-2 p-4 ${collapsed ? 'flex-col' : 'justify-between'}`}>
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-neon-magenta to-neon-violet shadow-[0_0_20px_rgba(201,62,255,0.35)]">
            <ShieldCheck className="size-5 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.1 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="truncate text-sm font-semibold tracking-tight text-foreground"
              >
                Venta de Seguros
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>{toggleButton}</TooltipTrigger>
          {collapsed && <TooltipContent side="right">Expandir menú</TooltipContent>}
        </Tooltip>
      </div>

      {/* Secciones */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-2">
        {SECTIONS.map((section) => (
          <SidebarItem
            key={section.id}
            icon={section.icon}
            label={section.label}
            active={section.id === activeSectionId}
            collapsed={collapsed}
            onClick={() => onSelectSection(section.id)}
          />
        ))}
      </nav>

      {/* Usuario + cerrar sesión */}
      <UserFooter collapsed={collapsed} />
    </motion.aside>
  )
}
