import { AnimatePresence, motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  active: boolean
  collapsed: boolean
  onClick: () => void
}

export function SidebarItem({ icon: Icon, label, active, collapsed, onClick }: SidebarItemProps) {
  const button = (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-all duration-200',
        collapsed && 'justify-center px-0',
        active
          ? 'border-neon-magenta/30 bg-gradient-to-r from-neon-magenta/20 to-neon-violet/10 text-foreground shadow-[0_0_20px_rgba(201,62,255,0.25)]'
          : 'border-transparent text-text-secondary hover:bg-white/5 hover:text-foreground',
      )}
    >
      <Icon className={cn('size-5 shrink-0', active && 'text-neon-magenta')} />
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="truncate"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )

  // Wrapper Tooltip constante: si cambiara el tipo de raíz al colapsar,
  // React remontaría el botón y las animaciones de exit del label no dispararían.
  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      {collapsed && <TooltipContent side="right">{label}</TooltipContent>}
    </Tooltip>
  )
}
