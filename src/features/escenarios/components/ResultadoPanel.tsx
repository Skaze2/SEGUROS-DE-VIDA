import { CheckCircle2, ShieldAlert, ShieldCheck, Users } from 'lucide-react'
import { CountUp } from '@/components/shared/CountUp'
import { GradientCard } from '@/components/shared/GradientCard'
import { cn } from '@/lib/utils'
import { formatPercent, formatUSD } from '@/lib/money'
import { FPL_YEAR } from '@/lib/fpl'
import { estiloElegibilidad, type ResultadoElegibilidad } from '@/features/escenarios/eligibility'

export function ResultadoPanel({
  resultado,
  notaReferencia,
}: {
  resultado: ResultadoElegibilidad
  notaReferencia?: string
}) {
  const estilo = estiloElegibilidad(resultado.elegibilidad)
  const Icon =
    resultado.elegibilidad === 'SI'
      ? ShieldCheck
      : resultado.elegibilidad === 'PARCIAL'
        ? ShieldAlert
        : ShieldAlert

  return (
    <GradientCard innerClassName="p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Resultado de elegibilidad</h2>
        <span className="rounded-full border border-border bg-foreground/5 px-2.5 py-0.5 text-[10px] font-medium text-text-secondary">
          FPL {FPL_YEAR}
        </span>
      </div>

      {/* % FPL */}
      <div className="mt-4 text-center">
        <CountUp
          value={resultado.porcentajeFpl}
          format={formatPercent}
          className="block bg-gradient-to-r from-brand to-brand-2 bg-clip-text text-5xl font-bold tracking-tight text-transparent"
        />
        <p className="mt-1 text-xs text-text-secondary">del Nivel Federal de Pobreza</p>
      </div>

      {/* Badge de elegibilidad */}
      <div
        className={cn(
          'mt-4 flex items-center gap-2 rounded-xl border p-3',
          estilo.border,
          estilo.bg,
        )}
      >
        <Icon className={cn('size-5 shrink-0', estilo.text)} />
        <div className="min-w-0">
          <p className={cn('text-sm font-semibold', estilo.text)}>
            Subsidio del Mercado: {estilo.label}
          </p>
          <p className="text-xs leading-snug text-text-secondary">{resultado.categoria}</p>
        </div>
      </div>

      {/* Cifras */}
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-text-secondary">Ingreso del hogar</dt>
          <dd className="font-medium text-foreground">{formatUSD(resultado.ingresoHogar)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-text-secondary">
            Umbral 100% FPL ({resultado.tamanoHogar} {resultado.tamanoHogar === 1 ? 'persona' : 'personas'})
          </dt>
          <dd className="font-medium text-foreground">{formatUSD(resultado.fpl100)}</dd>
        </div>
      </dl>

      {/* Inscribibles */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-neon-cyan/25 bg-neon-cyan/10 p-3">
          <div className="flex items-center gap-1.5 text-neon-cyan">
            <CheckCircle2 className="size-4" />
            <span className="text-lg font-bold">{resultado.miembrosInscribibles}</span>
          </div>
          <p className="mt-0.5 text-[11px] text-text-secondary">Pueden inscribirse</p>
        </div>
        <div
          className={cn(
            'rounded-xl border p-3',
            resultado.miembrosNoInscribibles > 0
              ? 'border-neon-coral/25 bg-neon-coral/10'
              : 'border-border bg-foreground/[0.04]',
          )}
        >
          <div
            className={cn(
              'flex items-center gap-1.5',
              resultado.miembrosNoInscribibles > 0 ? 'text-neon-coral' : 'text-text-secondary',
            )}
          >
            <Users className="size-4" />
            <span className="text-lg font-bold">{resultado.miembrosNoInscribibles}</span>
          </div>
          <p className="mt-0.5 text-[11px] text-text-secondary">Sin estatus resuelto</p>
        </div>
      </div>

      {notaReferencia && (
        <p className="mt-4 rounded-xl border border-border bg-foreground/[0.04] p-3 text-xs leading-relaxed text-text-secondary">
          <span className="font-medium text-foreground">Nota del escenario: </span>
          {notaReferencia}
        </p>
      )}
    </GradientCard>
  )
}
