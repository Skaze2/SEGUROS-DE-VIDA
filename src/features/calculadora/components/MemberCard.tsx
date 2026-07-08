import { motion } from 'motion/react'
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { formatUSD } from '@/lib/money'
import type { Member } from '@/types/calculadora'

interface MemberCardProps {
  member: Member
  onRemove: (id: string) => void
}

export function MemberCard({ member, onRemove }: MemberCardProps) {
  const is1099 = member.contractType === '1099'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      className="rounded-2xl border border-white/10 bg-card-bg p-4 transition-shadow duration-200 hover:shadow-[0_0_20px_rgba(47,107,255,0.15)]"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <p className="truncate text-sm font-semibold text-foreground">{member.name}</p>
          <Badge
            className={cn(
              'shrink-0 border text-[10px]',
              is1099
                ? 'border-neon-violet/40 bg-neon-violet/15 text-neon-violet brightness-150'
                : 'border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan',
            )}
          >
            {is1099 ? '1099' : 'W-2'}
          </Badge>
        </div>
        <button
          onClick={() => onRemove(member.id)}
          aria-label={`Quitar a ${member.name}`}
          className="flex size-7 shrink-0 items-center justify-center rounded-lg text-text-secondary transition-colors duration-200 hover:bg-neon-coral/10 hover:text-neon-coral"
        >
          <X className="size-4" />
        </button>
      </div>

      <dl className="space-y-1.5 text-xs">
        <div className="flex justify-between">
          <dt className="text-text-secondary">Ingreso semanal</dt>
          <dd className="text-foreground">{formatUSD(member.weeklyIncome)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-text-secondary">Ingreso anual (× 52)</dt>
          <dd className="text-foreground">{formatUSD(member.annualIncome)}</dd>
        </div>
        {member.deductible !== undefined && (
          <div className="flex justify-between">
            <dt className="text-text-secondary">Deducible</dt>
            <dd className="text-neon-coral">− {formatUSD(member.deductible)}</dd>
          </div>
        )}
        <div className="flex justify-between border-t border-white/10 pt-1.5">
          <dt className="font-medium text-text-secondary">Neto declarado</dt>
          <dd className="font-semibold text-neon-cyan">{formatUSD(member.netIncome)}</dd>
        </div>
      </dl>
    </motion.div>
  )
}
