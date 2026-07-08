import { AnimatePresence, motion } from 'motion/react'
import { Users } from 'lucide-react'
import type { Member } from '@/types/calculadora'
import { MemberCard } from '@/features/calculadora/components/MemberCard'

interface MemberListProps {
  members: Member[]
  onRemove: (id: string) => void
}

export function MemberList({ members, onRemove }: MemberListProps) {
  // AnimatePresence siempre montado: si el estado vacío lo reemplazara,
  // la animación de exit de la última tarjeta nunca se reproduciría.
  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {members.map((member) => (
          <MemberCard key={member.id} member={member} onRemove={onRemove} />
        ))}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {members.length === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.15 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-10 text-center"
          >
            <Users className="size-6 text-text-secondary" />
            <p className="text-sm text-text-secondary">
              Aún no has agregado cotizantes.
              <br />
              Usa el formulario para sumar el primero al hogar fiscal.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
