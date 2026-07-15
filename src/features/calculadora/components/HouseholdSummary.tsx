import { Minus, Plus, Users, Wallet } from 'lucide-react'
import { CountUp } from '@/components/shared/CountUp'
import { StateCombobox } from '@/components/shared/StateCombobox'
import { fplJurisdictionFor } from '@/lib/fpl'
import { formatUSDWhole } from '@/lib/money'

interface HouseholdSummaryProps {
  totalIncome: number
  memberCount: number
  householdSize: number
  stateAbbr: string | null
  onHouseholdSizeChange: (size: number) => void
  onStateChange: (abbr: string | null) => void
}

export function HouseholdSummary({
  totalIncome,
  memberCount,
  householdSize,
  stateAbbr,
  onHouseholdSizeChange,
  onStateChange,
}: HouseholdSummaryProps) {
  const jurisdiction = fplJurisdictionFor(stateAbbr)
  return (
    <div className="rounded-2xl border border-border bg-card-bg p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-neon-blue/10">
          <Wallet className="size-4 text-neon-blue" />
        </div>
        <h2 className="text-sm font-semibold text-foreground">Resumen del hogar fiscal</h2>
      </div>

      <p className="text-xs text-text-secondary">
        Ingreso total declarado ({memberCount} {memberCount === 1 ? 'cotizante' : 'cotizantes'})
      </p>
      <CountUp
        value={totalIncome}
        format={formatUSDWhole}
        className="mt-1 block text-3xl font-bold tracking-tight text-foreground"
      />

      <div className="mt-5 space-y-2">
        <p className="text-sm font-medium leading-none text-foreground">
          Tamaño del hogar fiscal
        </p>
        <div
          role="group"
          aria-label="Tamaño del hogar fiscal"
          className="flex items-center gap-3"
        >
          <button
            onClick={() => onHouseholdSizeChange(householdSize - 1)}
            disabled={householdSize <= 1}
            aria-label="Reducir tamaño del hogar"
            className="flex size-9 items-center justify-center rounded-xl border border-border bg-foreground/[0.04] text-foreground transition-all duration-200 hover:border-foreground/20 hover:bg-foreground/[0.08] disabled:opacity-30"
          >
            <Minus className="size-4" />
          </button>
          <div className="flex min-w-16 items-center justify-center gap-2 rounded-xl border border-border bg-elevated px-4 py-2">
            <Users className="size-4 text-neon-blue" />
            <span aria-live="polite" className="text-sm font-semibold text-foreground">
              {householdSize}
            </span>
          </div>
          <button
            onClick={() => onHouseholdSizeChange(householdSize + 1)}
            aria-label="Aumentar tamaño del hogar"
            className="flex size-9 items-center justify-center rounded-xl border border-border bg-foreground/[0.04] text-foreground transition-all duration-200 hover:border-foreground/20 hover:bg-foreground/[0.08]"
          >
            <Plus className="size-4" />
          </button>
          <span className="text-xs text-text-secondary">
            {householdSize === 1 ? 'persona' : 'personas'}
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <label htmlFor="household-state" className="text-sm font-medium leading-none text-foreground">
          Estado del hogar
        </label>
        <StateCombobox id="household-state" value={stateAbbr} onChange={onStateChange} />
        <p className="text-[11px] leading-relaxed text-text-secondary">
          {jurisdiction === 'contiguous'
            ? 'El FPL es federal: los 48 estados contiguos + DC comparten la misma tabla. Solo Alaska y Hawái tienen tabla propia.'
            : `${jurisdiction === 'AK' ? 'Alaska' : 'Hawái'} usa su propia tabla FPL del HHS (más alta por costo de vida): se aplicará automáticamente.`}
        </p>
      </div>
    </div>
  )
}
