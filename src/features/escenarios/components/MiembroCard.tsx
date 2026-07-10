import { motion } from 'motion/react'
import { X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { formatUSD } from '@/lib/money'
import { MoneyInput } from '@/components/shared/MoneyInput'
import { CONTRATOS, ESTATUS, ROLES, type MiembroEditable } from '@/features/escenarios/simuladorState'

interface MiembroCardProps {
  miembro: MiembroEditable
  index: number
  canRemove: boolean
  onUpdate: (patch: Partial<MiembroEditable>) => void
  onRemove: () => void
}

function SegButton<T extends string | null>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map((opt) => {
        const selected = opt.value === value
        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'rounded-lg border px-2.5 py-1 text-xs font-medium transition-all duration-200',
              selected
                ? 'border-brand/40 bg-brand/15 text-brand-strong'
                : 'border-border bg-foreground/[0.04] text-text-secondary hover:text-foreground',
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

export function MiembroCard({ miembro, index, canRemove, onUpdate, onRemove }: MiembroCardProps) {
  const trabaja = miembro.tipo_contrato !== null

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-border bg-foreground/[0.03] p-3.5"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-foreground">Miembro {index + 1}</span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Quitar miembro ${index + 1}`}
            className="flex size-6 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-neon-coral/10 hover:text-neon-coral"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      <div className="grid gap-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="space-y-1">
            <p className="text-[11px] text-text-secondary">Rol</p>
            <SegButton
              options={ROLES}
              value={miembro.rol}
              onChange={(rol) => onUpdate({ rol })}
            />
          </div>
          <div className="space-y-1">
            <p className="text-[11px] text-text-secondary">Edad</p>
            <Input
              type="text"
              inputMode="numeric"
              value={String(miembro.edad)}
              onChange={(e) => onUpdate({ edad: Math.max(0, Math.round(Number(e.target.value.replace(/\D/g, '')) || 0)) })}
              className="h-8 w-16 rounded-lg text-center text-sm"
            />
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[11px] text-text-secondary">Tipo de contrato</p>
          <SegButton
            options={CONTRATOS}
            value={miembro.tipo_contrato}
            onChange={(tipo_contrato) => onUpdate({ tipo_contrato })}
          />
        </div>

        {trabaja && (
          <div className="space-y-1">
            <p className="text-[11px] text-text-secondary">Ingreso bruto SEMANAL (lo que gana)</p>
            <MoneyInput
              value={miembro.ingreso_semanal}
              onCommit={(ingreso_semanal) => onUpdate({ ingreso_semanal })}
              placeholder="Ej: 769"
              className="h-9 text-sm"
            />
            <p className="text-[11px] text-text-secondary">
              = <span className="font-medium text-neon-cyan">{formatUSD(miembro.ingreso_anual)}</span>{' '}
              al año (× 52)
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="space-y-1">
            <p className="text-[11px] text-text-secondary">Declara / suma en taxes</p>
            <SegButton
              options={[
                { value: 'si', label: 'Sí declara' },
                { value: 'no', label: 'No declara' },
              ]}
              value={miembro.declara_taxes ? 'si' : 'no'}
              onChange={(v) => onUpdate({ declara_taxes: v === 'si' })}
            />
          </div>
          <div className="space-y-1">
            <p className="text-[11px] text-text-secondary">Estatus migratorio</p>
            <SegButton
              options={ESTATUS}
              value={miembro.estatus_migratorio}
              onChange={(estatus_migratorio) => onUpdate({ estatus_migratorio })}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
