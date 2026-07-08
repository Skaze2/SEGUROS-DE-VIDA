import { AnimatePresence, motion } from 'motion/react'
import { LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function UserFooter({ collapsed }: { collapsed: boolean }) {
  const { user, signOutUser } = useAuth()

  const displayName = user?.displayName ?? 'Agente'
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const avatar = user?.photoURL ? (
    <img
      src={user.photoURL}
      alt={displayName}
      referrerPolicy="no-referrer"
      className="size-9 shrink-0 rounded-full border border-border"
    />
  ) : (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neon-blue to-neon-cyan text-xs font-semibold text-white">
      {initials}
    </div>
  )

  const handleSignOut = async () => {
    try {
      await signOutUser()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      toast.error('No se pudo cerrar la sesión. Inténtalo de nuevo.')
    }
  }

  const signOutButton = (
    <button
      onClick={() => void handleSignOut()}
      aria-label="Cerrar sesión"
      className="flex size-9 shrink-0 items-center justify-center rounded-lg text-text-secondary transition-all duration-200 hover:bg-neon-coral/10 hover:text-neon-coral"
    >
      <LogOut className="size-4.5" />
    </button>
  )

  return (
    <div
      className={cn(
        'flex items-center gap-2 border-t border-border p-3',
        collapsed && 'flex-col',
      )}
    >
      {avatar}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="min-w-0 flex-1"
          >
            <p className="truncate text-sm font-medium text-foreground">{displayName}</p>
            <p className="truncate text-xs text-text-secondary">{user?.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <Tooltip>
        <TooltipTrigger asChild>{signOutButton}</TooltipTrigger>
        <TooltipContent side="right">Cerrar sesión</TooltipContent>
      </Tooltip>
    </div>
  )
}
