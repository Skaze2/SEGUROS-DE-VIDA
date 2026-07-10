import { useMemo, useReducer } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FlaskConical, HeartPulse, Home, Plus, RotateCcw, Stethoscope, UserPlus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { ESCENARIOS, ESCENARIOS_META } from '@/features/escenarios/escenariosData'
import { evaluarHogar } from '@/features/escenarios/eligibility'
import { hogarInicial, hogarReducer } from '@/features/escenarios/simuladorState'
import { ScenarioPicker } from '@/features/escenarios/components/ScenarioPicker'
import { MiembroCard } from '@/features/escenarios/components/MiembroCard'
import { ResultadoPanel } from '@/features/escenarios/components/ResultadoPanel'
import { DesgloseHogar } from '@/features/escenarios/components/DesgloseHogar'

function Toggle({
  active,
  onToggle,
  onLabel,
  offLabel,
}: {
  active: boolean
  onToggle: () => void
  onLabel: string
  offLabel: string
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-200',
        active
          ? 'border-brand/40 bg-brand/15 text-brand-strong'
          : 'border-border bg-foreground/[0.04] text-text-secondary hover:text-foreground',
      )}
    >
      <span
        className={cn(
          'flex h-4 w-7 items-center rounded-full p-0.5 transition-colors',
          active ? 'bg-brand justify-end' : 'bg-foreground/20 justify-start',
        )}
      >
        <span className="size-3 rounded-full bg-white" />
      </span>
      {active ? onLabel : offLabel}
    </button>
  )
}

export function EscenariosPage() {
  const [hogar, dispatch] = useReducer(hogarReducer, hogarInicial)

  const resultado = useMemo(
    () =>
      evaluarHogar({
        estado: hogar.estado,
        codigoPostal: hogar.codigoPostal,
        ciudad: hogar.ciudad,
        expansionMedicaid: hogar.expansionMedicaid,
        tieneMedicareMedicaid: hogar.tieneMedicareMedicaid,
        miembros: hogar.miembros,
      }),
    [hogar],
  )

  const escenarioActivo = ESCENARIOS.find((e) => e.id === hogar.escenarioId)

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
      {/* Encabezado */}
      <motion.section
        variants={fadeUp}
        className="rounded-2xl border border-border bg-card-bg p-5 sm:p-6"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-2 shadow-[0_0_20px_var(--brand-glow)]">
            <FlaskConical className="size-5 text-brand-foreground" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Simulador de escenarios ACA</h2>
            <p className="text-sm text-text-secondary">
              Elige una casuística, ajusta el hogar y observa la elegibilidad al subsidio en vivo.
            </p>
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">
            Casuísticas de prueba ({ESCENARIOS.length})
          </p>
          <ScenarioPicker
            activeId={hogar.escenarioId}
            onSelect={(id) => {
              const esc = ESCENARIOS.find((e) => e.id === id)
              if (esc) dispatch({ type: 'LOAD_SCENARIO', escenario: esc })
            }}
          />
        </div>
      </motion.section>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Editor del hogar */}
        <motion.section
          variants={fadeUp}
          className="space-y-4 rounded-2xl border border-border bg-card-bg p-5 sm:p-6"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-neon-cyan/10">
              <Home className="size-4 text-neon-cyan" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Hogar fiscal</h3>
          </div>

          {/* Datos generales */}
          <div className="grid gap-3 sm:grid-cols-[1fr_100px_1fr]">
            <div className="space-y-1.5">
              <Label htmlFor="sim-ciudad">Ciudad</Label>
              <Input
                id="sim-ciudad"
                value={hogar.ciudad}
                onChange={(e) => dispatch({ type: 'SET_CAMPO', campo: 'ciudad', valor: e.target.value })}
                placeholder="Ej: Miami"
                className="h-9 rounded-lg"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sim-estado">Estado</Label>
              <Input
                id="sim-estado"
                value={hogar.estado}
                onChange={(e) =>
                  dispatch({ type: 'SET_CAMPO', campo: 'estado', valor: e.target.value.toUpperCase().slice(0, 2) })
                }
                placeholder="FL"
                className="h-9 rounded-lg"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sim-zip">Código postal</Label>
              <Input
                id="sim-zip"
                value={hogar.codigoPostal}
                onChange={(e) =>
                  dispatch({ type: 'SET_CAMPO', campo: 'codigoPostal', valor: e.target.value.replace(/\D/g, '').slice(0, 5) })
                }
                placeholder="33135"
                className="h-9 rounded-lg"
              />
            </div>
          </div>

          {/* Toggles del hogar */}
          <div className="flex flex-wrap gap-2">
            <div className="space-y-1.5">
              <p className="flex items-center gap-1 text-[11px] text-text-secondary">
                <HeartPulse className="size-3" /> Expansión de Medicaid
              </p>
              <Toggle
                active={hogar.expansionMedicaid}
                onToggle={() => dispatch({ type: 'TOGGLE_EXPANSION' })}
                onLabel="Con expansión"
                offLabel="Sin expansión"
              />
            </div>
            <div className="space-y-1.5">
              <p className="flex items-center gap-1 text-[11px] text-text-secondary">
                <Stethoscope className="size-3" /> ¿Ya tiene Medicare/Medicaid?
              </p>
              <Toggle
                active={hogar.tieneMedicareMedicaid}
                onToggle={() => dispatch({ type: 'TOGGLE_MEDICARE' })}
                onLabel="Sí tiene"
                offLabel="No tiene"
              />
            </div>
          </div>

          {/* Miembros */}
          <div className="flex items-center justify-between pt-1">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-text-secondary">
              <UserPlus className="size-3.5" /> Miembros del hogar ({hogar.miembros.length})
            </p>
            <Button
              onClick={() => dispatch({ type: 'ADD_MIEMBRO' })}
              variant="outline"
              size="sm"
              className="gap-1.5 rounded-lg border-border bg-foreground/[0.04] text-foreground hover:border-brand/40 hover:text-brand-strong"
            >
              <Plus className="size-3.5" />
              Agregar
            </Button>
          </div>

          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {hogar.miembros.map((miembro, index) => (
                <MiembroCard
                  key={miembro.id}
                  miembro={miembro}
                  index={index}
                  canRemove={hogar.miembros.length > 1}
                  onUpdate={(patch) => dispatch({ type: 'UPDATE_MIEMBRO', id: miembro.id, patch })}
                  onRemove={() => dispatch({ type: 'REMOVE_MIEMBRO', id: miembro.id })}
                />
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-end pt-1">
            <Button
              onClick={() => dispatch({ type: 'RESET' })}
              variant="ghost"
              size="sm"
              className="gap-1.5 rounded-lg text-text-secondary hover:text-foreground"
            >
              <RotateCcw className="size-3.5" />
              Reiniciar hogar
            </Button>
          </div>
        </motion.section>

        {/* Resultado + desglose */}
        <motion.div variants={fadeUp} className="space-y-4">
          <ResultadoPanel
            resultado={resultado}
            notaReferencia={escenarioActivo?.referencia_esperada.nota}
          />
          <DesgloseHogar miembros={hogar.miembros} />
          <p className="rounded-2xl border border-dashed border-border bg-foreground/[0.02] p-3 text-[11px] leading-relaxed text-text-secondary">
            {ESCENARIOS_META.aviso}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
