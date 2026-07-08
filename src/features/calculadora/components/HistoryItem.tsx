import { motion } from 'motion/react'
import { Pencil, Trash2, Users } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { formatDate, formatPercent, formatUSD } from '@/lib/money'
import { fplBand } from '@/lib/fpl'
import type { Calculation } from '@/types/calculadora'

interface HistoryItemProps {
  calc: Calculation
  isEditing: boolean
  onEdit: (calc: Calculation) => void
  onDelete: (id: string) => void
}

export function HistoryItem({ calc, isEditing, onEdit, onDelete }: HistoryItemProps) {
  const band = fplBand(calc.fplPercent)
  const dateLabel = calc.updatedAt ? formatDate(calc.updatedAt.toDate()) : 'Guardando…'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'rounded-2xl border bg-card-bg p-4 transition-shadow duration-200 hover:shadow-[0_0_20px_var(--brand-glow-soft)]',
        isEditing ? 'border-brand/40 shadow-[0_0_20px_var(--brand-glow-soft)]' : 'border-border',
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-foreground">{calc.title}</p>
            {isEditing && (
              <span className="shrink-0 rounded-full border border-brand/40 bg-brand/15 px-2 py-0.5 text-[10px] font-medium text-brand-strong">
                Editando
              </span>
            )}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary">
            <span>{dateLabel}</span>
            <span className="inline-flex items-center gap-1">
              <Users className="size-3" />
              {calc.members.length} {calc.members.length === 1 ? 'cotizante' : 'cotizantes'}
            </span>
            <span className="font-medium text-foreground">{formatUSD(calc.totalIncome)}</span>
            <span
              className="inline-flex items-center gap-1 font-medium"
              style={{ color: band.color }}
            >
              <span
                className="size-1.5 rounded-full"
                style={{ backgroundColor: band.color, boxShadow: `0 0 6px ${band.color}` }}
              />
              {formatPercent(calc.fplPercent)} FPL
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            onClick={() => onEdit(calc)}
            variant="outline"
            size="sm"
            className="gap-1.5 rounded-xl border-border bg-foreground/[0.04] text-foreground transition-all duration-200 hover:scale-[1.02] hover:border-neon-cyan/40 hover:bg-neon-cyan/10 hover:text-neon-cyan"
          >
            <Pencil className="size-3.5" />
            Editar
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 rounded-xl text-text-secondary transition-all duration-200 hover:bg-neon-coral/10 hover:text-neon-coral"
              >
                <Trash2 className="size-3.5" />
                Eliminar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-2xl border-border bg-elevated/90 backdrop-blur-xl">
              <AlertDialogHeader>
                <AlertDialogTitle>¿Eliminar este cálculo?</AlertDialogTitle>
                <AlertDialogDescription>
                  Se eliminará «{calc.title}» del historial. Esta acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => calc.id && onDelete(calc.id)}
                  className="rounded-xl bg-neon-coral text-white hover:bg-neon-coral/80"
                >
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </motion.div>
  )
}
