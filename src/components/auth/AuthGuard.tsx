import type { ReactNode } from 'react'
import { LoaderCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { LoginScreen } from '@/components/auth/LoginScreen'

export function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex h-dvh items-center justify-center bg-background">
        <LoaderCircle className="size-8 animate-spin text-neon-magenta" />
      </div>
    )
  }

  if (!user) {
    return <LoginScreen />
  }

  return <>{children}</>
}
