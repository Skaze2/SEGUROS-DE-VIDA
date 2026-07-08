import { AnimatePresence, motion } from 'motion/react'
import { CircleAlert, Home, UserRound } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { DeductibleEvaluation } from '@/features/calculadora/deductible'

interface DeductibleFieldProps {
  value: string
  onChange: (value: string) => void
  evaluation: DeductibleEvaluation
}

const MESSAGE_STYLES: Record<string, { className: string; icon: typeof CircleAlert }> = {
  invalid: { className: 'text-neon-coral', icon: CircleAlert },
  'sin-hogar': { className: 'text-neon-cyan', icon: UserRound },
  'con-hogar': { className: 'text-neon-violet brightness-150', icon: Home },
}

export function DeductibleField({ value, onChange, evaluation }: DeductibleFieldProps) {
  const style = evaluation.status !== 'empty' ? MESSAGE_STYLES[evaluation.status] : null

  return (
    <div className="space-y-2">
      <Label htmlFor="deductible">Deducible anual ($4,000 – $8,000)</Label>
      <Input
        id="deductible"
        type="text"
        inputMode="decimal"
        placeholder="Ej: 5,000"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={evaluation.status === 'invalid'}
        className={cn(
          'rounded-xl transition-shadow duration-200',
          evaluation.status === 'invalid' && 'border-neon-coral/60',
        )}
      />
      <AnimatePresence mode="wait" initial={false}>
        {style && evaluation.status !== 'empty' && (
          <motion.p
            key={evaluation.status}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn('flex items-start gap-1.5 text-xs leading-relaxed', style.className)}
          >
            <style.icon className="mt-0.5 size-3.5 shrink-0" />
            {evaluation.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
