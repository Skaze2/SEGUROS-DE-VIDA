import { Ban, CheckCircle2, ListTree } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatUSD } from '@/lib/money'
import { ingresoHogar } from '@/features/escenarios/eligibility'
import { ROLES, type MiembroEditable } from '@/features/escenarios/simuladorState'

const CONTRATO_LABEL: Record<string, string> = { W2: 'W-2', '1099': '1099' }

function rolLabel(rol: string) {
  return ROLES.find((r) => r.value === rol)?.label ?? rol
}

export function DesgloseHogar({ miembros }: { miembros: MiembroEditable[] }) {
  const totalSemanal = miembros.reduce(
    (sum, m) => sum + (m.tipo_contrato !== null && m.declara_taxes ? m.ingreso_semanal : 0),
    0,
  )
  const totalAnual = ingresoHogar(miembros)

  return (
    <div className="rounded-2xl border border-border bg-card-bg p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-neon-blue/10">
          <ListTree className="size-4 text-neon-blue" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">Desglose del hogar</h3>
      </div>

      {/* Un miembro por línea (no separado por comas) */}
      <ul className="divide-y divide-border">
        {miembros.map((m, index) => {
          const trabaja = m.tipo_contrato !== null
          const puedeInscribirse = m.estatus_migratorio === 'resuelto'
          return (
            <li key={m.id} className="flex items-start justify-between gap-3 py-3 first:pt-0">
              <div className="min-w-0 space-y-0.5">
                <p className="text-sm font-medium text-foreground">
                  {index + 1}. {rolLabel(m.rol)}
                  <span className="text-text-secondary">
                    {' · '}
                    {trabaja ? CONTRATO_LABEL[m.tipo_contrato as string] : 'No trabaja'}
                    {' · '}
                    {m.edad} años
                  </span>
                </p>
                {trabaja ? (
                  <p className="text-xs text-text-secondary">
                    Ingreso semanal:{' '}
                    <span className="font-semibold text-neon-cyan">{formatUSD(m.ingreso_semanal)}</span>
                  </p>
                ) : (
                  <p className="text-xs text-text-secondary">Sin ingreso</p>
                )}
                {trabaja && (
                  <p className="text-xs text-text-secondary">
                    Ingreso anual (× 52):{' '}
                    <span className="font-medium text-foreground">{formatUSD(m.ingreso_anual)}</span>
                    {m.declara_taxes ? '' : ' · no suma al hogar'}
                  </p>
                )}
              </div>

              <span
                className={cn(
                  'inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium',
                  puedeInscribirse
                    ? 'border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan'
                    : 'border-neon-coral/30 bg-neon-coral/10 text-neon-coral',
                )}
              >
                {puedeInscribirse ? <CheckCircle2 className="size-3" /> : <Ban className="size-3" />}
                {puedeInscribirse ? 'Inscribible' : 'Sin estatus'}
              </span>
            </li>
          )
        })}
      </ul>

      {/* Totales del hogar */}
      <div className="mt-4 space-y-1.5 rounded-xl border border-border bg-foreground/[0.04] p-3 text-sm">
        <div className="flex justify-between">
          <span className="text-text-secondary">Ingreso semanal del hogar</span>
          <span className="font-semibold text-foreground">{formatUSD(totalSemanal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Ingreso anual del hogar (declarado)</span>
          <span className="font-semibold text-neon-cyan">{formatUSD(totalAnual)}</span>
        </div>
      </div>
    </div>
  )
}
