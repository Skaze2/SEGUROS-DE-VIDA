import { useMemo, useReducer, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { PencilLine, X } from 'lucide-react'
import { toast } from 'sonner'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { formatDate, round2 } from '@/lib/money'
import { FPL_YEAR, fplPercent } from '@/lib/fpl'
import { useCalculations, type CalculationDraft } from '@/hooks/useCalculations'
import type { Calculation } from '@/types/calculadora'
import { initialSession, sessionReducer } from '@/features/calculadora/state'
import { MemberForm } from '@/features/calculadora/components/MemberForm'
import { MemberList } from '@/features/calculadora/components/MemberList'
import { HouseholdSummary } from '@/features/calculadora/components/HouseholdSummary'
import { FplResult } from '@/features/calculadora/components/FplResult'
import { HistoryPanel } from '@/features/calculadora/components/HistoryPanel'

export function CalculadoraPage() {
  const [session, dispatch] = useReducer(sessionReducer, initialSession)
  const { calculations, loading, saveCalculation, updateCalculation, deleteCalculation } =
    useCalculations()
  const [saving, setSaving] = useState(false)
  const pageTopRef = useRef<HTMLDivElement | null>(null)

  const totalIncome = useMemo(
    () => round2(session.members.reduce((sum, member) => sum + member.netIncome, 0)),
    [session.members],
  )
  const percent = useMemo(
    () => fplPercent(totalIncome, session.householdSize),
    [totalIncome, session.householdSize],
  )

  const handleSave = async () => {
    if (session.members.length === 0) return
    setSaving(true)
    const draft: CalculationDraft = {
      title: session.title.trim() || `Cálculo del ${formatDate(new Date())}`,
      members: session.members,
      householdSize: session.householdSize,
      totalIncome,
      fplPercent: percent,
      fplYear: FPL_YEAR,
    }
    try {
      if (session.editingCalcId) {
        await updateCalculation(session.editingCalcId, draft)
        toast.success('Cálculo actualizado')
      } else {
        await saveCalculation(draft)
        toast.success('Cálculo guardado')
      }
      dispatch({ type: 'RESET_SESSION' })
    } catch (error) {
      console.error('Error al guardar el cálculo:', error)
      toast.error('No se pudo guardar el cálculo.')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (calc: Calculation) => {
    if (!calc.id) return
    dispatch({
      type: 'LOAD_CALCULATION',
      calcId: calc.id,
      title: calc.title,
      members: calc.members,
      householdSize: calc.householdSize,
    })
    pageTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCalculation(id)
      if (session.editingCalcId === id) {
        dispatch({ type: 'RESET_SESSION' })
      }
      toast.success('Cálculo eliminado')
    } catch (error) {
      console.error('Error al eliminar el cálculo:', error)
      toast.error('No se pudo eliminar el cálculo.')
    }
  }

  return (
    <motion.div
      ref={pageTopRef}
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <AnimatePresence>
        {session.editingCalcId && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between gap-3 rounded-2xl border border-brand/30 bg-brand/10 px-4 py-3"
          >
            <p className="flex min-w-0 items-center gap-2 text-sm text-foreground">
              <PencilLine className="size-4 shrink-0 text-brand-strong" />
              <span className="truncate">
                Editando: <span className="font-semibold">{session.title || 'Sin título'}</span>
              </span>
            </p>
            <button
              onClick={() => dispatch({ type: 'RESET_SESSION' })}
              aria-label="Cancelar edición"
              className="flex size-7 shrink-0 items-center justify-center rounded-lg text-text-secondary transition-colors duration-200 hover:bg-foreground/10 hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={fadeUp} className="space-y-6">
          <MemberForm
            members={session.members}
            onAdd={(member) => dispatch({ type: 'ADD_MEMBER', member })}
          />
          <MemberList
            members={session.members}
            onRemove={(id) => dispatch({ type: 'REMOVE_MEMBER', id })}
          />
        </motion.div>

        <motion.div variants={fadeUp} className="space-y-6">
          <HouseholdSummary
            totalIncome={totalIncome}
            memberCount={session.members.length}
            householdSize={session.householdSize}
            onHouseholdSizeChange={(size) => dispatch({ type: 'SET_HOUSEHOLD_SIZE', size })}
          />
          <FplResult
            percent={percent}
            householdSize={session.householdSize}
            memberCount={session.members.length}
            title={session.title}
            isEditing={session.editingCalcId !== null}
            saving={saving}
            onTitleChange={(title) => dispatch({ type: 'SET_TITLE', title })}
            onSave={() => void handleSave()}
            onReset={() => dispatch({ type: 'RESET_SESSION' })}
          />
        </motion.div>
      </div>

      <motion.div variants={fadeUp}>
        <HistoryPanel
          calculations={calculations}
          loading={loading}
          editingCalcId={session.editingCalcId}
          onEdit={handleEdit}
          onDelete={(id) => void handleDelete(id)}
        />
      </motion.div>
    </motion.div>
  )
}
