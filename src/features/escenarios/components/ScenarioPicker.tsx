import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ESCENARIOS } from '@/features/escenarios/escenariosData'
import { estiloElegibilidad } from '@/features/escenarios/eligibility'

interface ScenarioPickerProps {
  activeId: string | null
  onSelect: (id: string) => void
}

export function ScenarioPicker({ activeId, onSelect }: ScenarioPickerProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
      {ESCENARIOS.map((esc) => {
        const selected = esc.id === activeId
        const estilo = estiloElegibilidad(esc.referencia_esperada.elegibilidad_subsidio)
        return (
          <motion.button
            key={esc.id}
            type="button"
            onClick={() => onSelect(esc.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'rounded-xl border p-3 text-left transition-all duration-200',
              selected
                ? 'border-brand/40 bg-gradient-to-r from-brand/15 to-brand-2/10 shadow-[0_0_16px_var(--brand-glow-soft)]'
                : 'border-border bg-foreground/[0.04] hover:border-foreground/20 hover:bg-foreground/[0.06]',
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-brand-strong">{esc.id}</span>
              <span
                className={cn(
                  'rounded-full border px-1.5 py-0.5 text-[10px] font-medium',
                  estilo.border,
                  estilo.bg,
                  estilo.text,
                )}
              >
                {estilo.label}
              </span>
            </div>
            <p className="mt-1 line-clamp-2 text-xs text-foreground">{esc.titulo}</p>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-text-secondary">
              <MapPin className="size-3" />
              {esc.ciudad}, {esc.estado} · {esc.tamano_hogar_fiscal} pers.
            </p>
          </motion.button>
        )
      })}
    </div>
  )
}
