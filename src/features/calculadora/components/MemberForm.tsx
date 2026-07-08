import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CircleAlert, Plus, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { formatUSD, parseMoney, round2 } from '@/lib/money'
import type { ContractType, Member } from '@/types/calculadora'
import { DeductibleField } from '@/features/calculadora/components/DeductibleField'
import { evaluateDeductible, isValidDeductible } from '@/features/calculadora/deductible'

interface MemberFormProps {
  members: Member[]
  onAdd: (member: Member) => void
}

const CONTRACT_OPTIONS: { value: ContractType; label: string; hint: string }[] = [
  { value: 'W2', label: 'W-2', hint: 'Sin deducibles' },
  { value: '1099', label: '1099', hint: 'Con deducibles' },
]

export function MemberForm({ members, onAdd }: MemberFormProps) {
  const [name, setName] = useState('')
  const [weeklyRaw, setWeeklyRaw] = useState('')
  const [contractType, setContractType] = useState<ContractType>('W2')
  const [deductibleRaw, setDeductibleRaw] = useState('')

  // Siguiente número libre para "Cotizante N" (evita duplicados al quitar intermedios)
  const suggestedNumber = useMemo(() => {
    const numbers = members
      .map((m) => /^Cotizante (\d+)$/.exec(m.name)?.[1])
      .filter((n): n is string => Boolean(n))
      .map(Number)
    return (numbers.length > 0 ? Math.max(...numbers) : 0) + 1
  }, [members])

  const weekly = parseMoney(weeklyRaw)
  const weeklyValid = Number.isFinite(weekly) && weekly > 0
  // Anual calculado desde el semanal ya redondeado, para que semanal×52 = anual siempre
  const weeklyRounded = weeklyValid ? round2(weekly) : 0
  const annualPreview = weeklyValid ? round2(weeklyRounded * 52) : null

  const is1099 = contractType === '1099'
  const deductibleEval = evaluateDeductible(deductibleRaw)
  const deductibleOk = isValidDeductible(deductibleEval)
  const deductibleExceedsAnnual =
    is1099 && deductibleOk && annualPreview !== null && deductibleEval.value > annualPreview

  const canAdd = weeklyValid && (!is1099 || (deductibleOk && !deductibleExceedsAnnual))

  const handleAdd = () => {
    if (!canAdd || annualPreview === null) return

    const member: Member = {
      id: crypto.randomUUID(),
      name: name.trim() || `Cotizante ${suggestedNumber}`,
      contractType,
      weeklyIncome: weeklyRounded,
      annualIncome: annualPreview,
      // En W-2 la clave deductible se omite por completo (Firestore rechaza undefined)
      ...(is1099 && deductibleOk ? { deductible: deductibleEval.value } : {}),
      netIncome:
        is1099 && deductibleOk ? round2(annualPreview - deductibleEval.value) : annualPreview,
    }

    onAdd(member)
    setName('')
    setWeeklyRaw('')
    setDeductibleRaw('')
  }

  return (
    <div className="rounded-2xl border border-border bg-card-bg p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-neon-cyan/10">
          <UserPlus className="size-4 text-neon-cyan" />
        </div>
        <h2 className="text-sm font-semibold text-foreground">Agregar cotizante</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="member-name">Nombre del cotizante</Label>
          <Input
            id="member-name"
            type="text"
            placeholder={`Cotizante ${suggestedNumber}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weekly-income">Ingreso semanal ($)</Label>
          <Input
            id="weekly-income"
            type="text"
            inputMode="decimal"
            placeholder="Ej: 1,200"
            value={weeklyRaw}
            onChange={(e) => setWeeklyRaw(e.target.value)}
            className="rounded-xl"
          />
          <AnimatePresence initial={false}>
            {annualPreview !== null && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-text-secondary"
              >
                Ingreso anual (× 52):{' '}
                <span className="font-medium text-neon-cyan">{formatUSD(annualPreview)}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-2">
          <Label>Tipo de contrato</Label>
          <div className="grid grid-cols-2 gap-2">
            {CONTRACT_OPTIONS.map((option) => {
              const selected = contractType === option.value
              return (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => setContractType(option.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'rounded-xl border px-3 py-2.5 text-left transition-all duration-200',
                    selected
                      ? 'border-brand/40 bg-gradient-to-r from-brand/20 to-brand-2/10 shadow-[0_0_20px_var(--brand-glow-soft)]'
                      : 'border-border bg-foreground/[0.04] hover:border-foreground/20 hover:bg-foreground/[0.06]',
                  )}
                >
                  <span
                    className={cn(
                      'block text-sm font-semibold',
                      selected ? 'text-foreground' : 'text-text-secondary',
                    )}
                  >
                    {option.label}
                  </span>
                  <span className="block text-xs text-text-secondary">{option.hint}</span>
                </motion.button>
              )
            })}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {is1099 && (
            <motion.div
              key="deductible-field"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <DeductibleField
                value={deductibleRaw}
                onChange={setDeductibleRaw}
                evaluation={deductibleEval}
              />
              <AnimatePresence initial={false}>
                {deductibleExceedsAnnual && annualPreview !== null && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-neon-coral"
                  >
                    <CircleAlert className="mt-0.5 size-3.5 shrink-0" />
                    El deducible no puede superar el ingreso anual del cotizante (
                    {formatUSD(annualPreview)}).
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          onClick={handleAdd}
          disabled={!canAdd}
          size="lg"
          className="w-full gap-2 rounded-xl bg-gradient-to-r from-brand to-brand-2 text-brand-foreground transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_20px_var(--brand-glow)] disabled:opacity-40"
        >
          <Plus className="size-4" />
          Agregar al hogar
        </Button>
      </div>
    </div>
  )
}
