import { AnimatePresence, motion } from 'motion/react'
import { CalendarRange, Plus, TriangleAlert, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MoneyInput } from '@/components/shared/MoneyInput'
import { cn } from '@/lib/utils'
import { formatUSD } from '@/lib/money'
import type { IncomePeriod, PeriodMethod } from '@/types/calculadora'
import {
  DEFAULT_HOURS_PER_WEEK,
  MESES,
  METHOD_OPTIONS,
  coveredMonths,
  hasOverlap,
  monthsInRange,
  periodIncome,
  totalVariableIncome,
  weeksInRange,
} from '@/features/calculadora/incomeEstimation'

export function nuevoPeriodo(startMonth = 0, endMonth = 2): IncomePeriod {
  const base: IncomePeriod = {
    id: crypto.randomUUID(),
    startMonth,
    endMonth,
    method: 'semanal',
    value: 0,
    hoursPerWeek: DEFAULT_HOURS_PER_WEEK,
    income: 0,
  }
  return { ...base, income: periodIncome(base) }
}

interface VariablePeriodsEditorProps {
  periods: IncomePeriod[]
  onChange: (periods: IncomePeriod[]) => void
}

export function VariablePeriodsEditor({ periods, onChange }: VariablePeriodsEditorProps) {
  const total = totalVariableIncome(periods)
  const covered = coveredMonths(periods)
  const overlap = hasOverlap(periods)

  const update = (id: string, patch: Partial<IncomePeriod>) => {
    onChange(
      periods.map((p) => {
        if (p.id !== id) return p
        const merged = { ...p, ...patch }
        // El rango debe ser coherente (fin >= inicio)
        if (patch.startMonth !== undefined && merged.endMonth < merged.startMonth) {
          merged.endMonth = merged.startMonth
        }
        if (patch.endMonth !== undefined && merged.endMonth < merged.startMonth) {
          merged.startMonth = merged.endMonth
        }
        merged.income = periodIncome(merged)
        return merged
      }),
    )
  }

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {periods.map((period, index) => {
          const meses = monthsInRange(period.startMonth, period.endMonth)
          const semanas = weeksInRange(period.startMonth, period.endMonth)
          const income = periodIncome(period)
          return (
            <motion.div
              key={period.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-border bg-foreground/[0.03] p-3.5"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <CalendarRange className="size-3.5 text-neon-cyan" />
                  Periodo {index + 1}
                </span>
                {periods.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onChange(periods.filter((p) => p.id !== period.id))}
                    aria-label={`Quitar periodo ${index + 1}`}
                    className="flex size-6 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-neon-coral/10 hover:text-neon-coral"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>

              {/* Rango de meses */}
              <div className="flex flex-wrap items-end gap-2">
                <div className="space-y-1">
                  <p className="text-[11px] text-text-secondary">Desde</p>
                  <Select
                    value={String(period.startMonth)}
                    onValueChange={(v) => update(period.id, { startMonth: Number(v) })}
                  >
                    <SelectTrigger className="h-9 w-32 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MESES.map((mes, i) => (
                        <SelectItem key={mes} value={String(i)}>
                          {mes}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] text-text-secondary">Hasta</p>
                  <Select
                    value={String(period.endMonth)}
                    onValueChange={(v) => update(period.id, { endMonth: Number(v) })}
                  >
                    <SelectTrigger className="h-9 w-32 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MESES.map((mes, i) => (
                        <SelectItem key={mes} value={String(i)} disabled={i < period.startMonth}>
                          {mes}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <span className="pb-2 text-[11px] text-text-secondary">
                  {meses} {meses === 1 ? 'mes' : 'meses'} · {Math.round(semanas * 100) / 100} sem
                </span>
              </div>

              {/* Método */}
              <div className="mt-3 space-y-1">
                <p className="text-[11px] text-text-secondary">¿Cómo lo reportó?</p>
                <div className="flex flex-wrap gap-1.5">
                  {METHOD_OPTIONS.map((opt) => {
                    const selected = opt.value === period.method
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => update(period.id, { method: opt.value as PeriodMethod })}
                        className={cn(
                          'rounded-lg border px-2.5 py-1.5 text-left transition-all duration-200',
                          selected
                            ? 'border-brand/40 bg-brand/15'
                            : 'border-border bg-foreground/[0.04] hover:border-foreground/20',
                        )}
                      >
                        <span
                          className={cn(
                            'block text-xs font-semibold',
                            selected ? 'text-brand-strong' : 'text-text-secondary',
                          )}
                        >
                          {opt.label}
                        </span>
                        <span className="block text-[10px] text-text-secondary">{opt.hint}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Valor según método */}
              <div className="mt-3 flex flex-wrap items-end gap-2">
                {period.method === 'fijo' && (
                  <div className="min-w-40 flex-1 space-y-1">
                    <p className="text-[11px] text-text-secondary">Monto total del periodo</p>
                    <MoneyInput
                      value={period.value}
                      onCommit={(value) => update(period.id, { value })}
                      placeholder="Ej: 7,000"
                      className="h-9 text-sm"
                    />
                  </div>
                )}
                {period.method === 'semanal' && (
                  <div className="min-w-40 flex-1 space-y-1">
                    <p className="text-[11px] text-text-secondary">Ingreso semanal</p>
                    <MoneyInput
                      value={period.value}
                      onCommit={(value) => update(period.id, { value })}
                      placeholder="Ej: 500"
                      className="h-9 text-sm"
                    />
                  </div>
                )}
                {period.method === 'hora' && (
                  <>
                    <div className="min-w-28 flex-1 space-y-1">
                      <p className="text-[11px] text-text-secondary">Tarifa por hora</p>
                      <MoneyInput
                        value={period.value}
                        onCommit={(value) => update(period.id, { value })}
                        placeholder="Ej: 20"
                        className="h-9 text-sm"
                      />
                    </div>
                    <div className="w-24 space-y-1">
                      <p className="text-[11px] text-text-secondary">Horas/sem</p>
                      <Input
                        type="text"
                        inputMode="numeric"
                        value={String(period.hoursPerWeek)}
                        onChange={(e) =>
                          update(period.id, {
                            hoursPerWeek: Math.max(
                              0,
                              Math.min(168, Math.round(Number(e.target.value.replace(/\D/g, '')) || 0)),
                            ),
                          })
                        }
                        className="h-9 rounded-lg text-center text-sm"
                      />
                    </div>
                  </>
                )}
              </div>

              <p className="mt-3 border-t border-border pt-2 text-xs text-text-secondary">
                Ingreso del periodo:{' '}
                <span className="font-semibold text-neon-cyan">{formatUSD(income)}</span>
              </p>
            </motion.div>
          )
        })}
      </AnimatePresence>

      <Button
        type="button"
        onClick={() => onChange([...periods, nuevoPeriodo()])}
        variant="outline"
        size="sm"
        className="w-full gap-1.5 rounded-lg border-dashed border-border bg-transparent text-text-secondary hover:border-brand/40 hover:text-brand-strong"
      >
        <Plus className="size-3.5" />
        Agregar periodo
      </Button>

      {/* Resumen */}
      <div className="space-y-2 rounded-xl border border-border bg-foreground/[0.04] p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-text-secondary">Ingreso anual estimado</span>
          <span className="font-bold text-neon-cyan">{formatUSD(total)}</span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-text-secondary">
          <span>Meses cubiertos</span>
          <span className={cn(covered < 12 && 'text-neon-orange')}>{covered} / 12</span>
        </div>
        <AnimatePresence initial={false}>
          {overlap && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-start gap-1.5 text-[11px] leading-relaxed text-neon-orange"
            >
              <TriangleAlert className="mt-0.5 size-3 shrink-0" />
              Hay meses cubiertos por más de un periodo; revisa que no estés sumando dos veces el
              mismo tiempo.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
