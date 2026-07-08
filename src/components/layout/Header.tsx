import { useAuth } from '@/hooks/useAuth'

export function Header({ title }: { title: string }) {
  const { user } = useAuth()

  return (
    <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-card-bg/40 px-4 py-4 backdrop-blur-xl sm:px-6">
      <h1 className="truncate text-base font-semibold tracking-tight text-foreground sm:text-lg">
        {title}
      </h1>
      <p className="shrink-0 text-sm text-text-secondary">
        Bienvenido,{' '}
        <span className="font-medium text-foreground">{user?.displayName ?? 'Agente'}</span>
      </p>
    </header>
  )
}
