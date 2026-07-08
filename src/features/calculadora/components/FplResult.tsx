import { Suspense, lazy } from 'react'
import { LoaderCircle, RotateCcw, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CountUp } from '@/components/shared/CountUp'
import { GradientCard } from '@/components/shared/GradientCard'
import { formatPercent, formatUSD } from '@/lib/money'
import { FPL_YEAR, fplBand, fplThreshold } from '@/lib/fpl'

// Lazy: echarts pesa ~400 KB y solo lo usa el gauge
const FplGauge = lazy(() =>
  import('@/features/calculadora/components/FplGauge').then((m) => ({ default: m.FplGauge })),
)

interface FplResultProps {
  percent: number
  householdSize: number
  memberCount: number
  title: string
  isEditing: boolean
  saving: boolean
  onTitleChange: (title: string) => void
  onSave: () => void
  onReset: () => void
}

export function FplResult({
  percent,
  householdSize,
  memberCount,
  title,
  isEditing,
  saving,
  onTitleChange,
  onSave,
  onReset,
}: FplResultProps) {
  const band = fplBand(percent)
  const threshold = fplThreshold(householdSize)
  const hasMembers = memberCount > 0

  return (
    <GradientCard innerClassName="p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Resultado FPL</h2>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium text-text-secondary">
          Guías HHS {FPL_YEAR}
        </span>
      </div>

      <div className="mt-4 text-center">
        <CountUp
          value={hasMembers ? percent : 0}
          format={formatPercent}
          className="block bg-gradient-to-r from-neon-magenta to-neon-violet bg-clip-text text-5xl font-bold tracking-tight text-transparent"
        />
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: band.color, boxShadow: `0 0 8px ${band.color}` }}
          />
          <span className="text-xs font-medium text-foreground">
            {hasMembers ? band.label : 'Sin cotizantes aún'}
          </span>
        </div>
      </div>

      <Suspense fallback={<div className="h-[190px]" />}>
        <FplGauge percent={hasMembers ? percent : 0} />
      </Suspense>

      <p className="text-center text-xs text-text-secondary">
        Umbral FPL {FPL_YEAR} para {householdSize} {householdSize === 1 ? 'persona' : 'personas'}:{' '}
        <span className="font-medium text-foreground">{formatUSD(threshold)}</span>
      </p>

      <div className="mt-5 space-y-2">
        <Label htmlFor="calc-title">Título del cálculo</Label>
        <Input
          id="calc-title"
          type="text"
          placeholder="Ej: Familia Rodríguez"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="rounded-xl"
        />
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button
          onClick={onSave}
          disabled={!hasMembers || saving}
          size="lg"
          className="flex-1 gap-2 rounded-xl bg-gradient-to-r from-neon-magenta to-neon-violet text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(201,62,255,0.35)] disabled:opacity-40"
        >
          {saving ? <LoaderCircle className="size-4 animate-spin" /> : <Save className="size-4" />}
          {isEditing ? 'Actualizar cálculo' : 'Guardar cálculo'}
        </Button>
        <Button
          onClick={onReset}
          variant="ghost"
          size="lg"
          className="gap-2 rounded-xl text-text-secondary hover:bg-white/5 hover:text-foreground"
        >
          <RotateCcw className="size-4" />
          Nuevo cálculo
        </Button>
      </div>
    </GradientCard>
  )
}
