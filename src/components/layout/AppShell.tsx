import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SECTIONS } from '@/app/sections'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

export function AppShell() {
  const [activeSectionId, setActiveSectionId] = useState(SECTIONS[0].id)
  const activeSection = SECTIONS.find((s) => s.id === activeSectionId) ?? SECTIONS[0]
  const ActiveComponent = activeSection.component

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <Sidebar activeSectionId={activeSection.id} onSelectSection={setActiveSectionId} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header title={activeSection.label} />

        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-8"
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
