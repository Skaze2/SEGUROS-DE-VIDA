import { AnimatePresence, motion } from 'motion/react'
import { History } from 'lucide-react'
import { HistorySkeleton } from '@/components/shared/HistorySkeleton'
import { HistoryItem } from '@/features/calculadora/components/HistoryItem'
import type { Calculation } from '@/types/calculadora'

interface HistoryPanelProps {
  calculations: Calculation[]
  loading: boolean
  editingCalcId: string | null
  onEdit: (calc: Calculation) => void
  onDelete: (id: string) => void
}

export function HistoryPanel({
  calculations,
  loading,
  editingCalcId,
  onEdit,
  onDelete,
}: HistoryPanelProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-card-bg/60 p-5 backdrop-blur-xl sm:p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-neon-orange/10">
          <History className="size-4 text-neon-orange" />
        </div>
        <h2 className="text-sm font-semibold text-foreground">Historial de cálculos</h2>
        {!loading && (
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-text-secondary">
            {calculations.length}
          </span>
        )}
      </div>

      {loading ? (
        <HistorySkeleton />
      ) : (
        // AnimatePresence siempre montado para que el exit del último ítem eliminado sí se reproduzca
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {calculations.map((calc) => (
              <HistoryItem
                key={calc.id}
                calc={calc}
                isEditing={calc.id === editingCalcId}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            {calculations.length === 0 && (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-8 text-center text-sm text-text-secondary"
              >
                Sin cálculos guardados todavía. Guarda tu primer análisis para verlo aquí.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  )
}
