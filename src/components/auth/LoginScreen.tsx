import { useState } from 'react'
import { motion } from 'motion/react'
import { FirebaseError } from 'firebase/app'
import { LoaderCircle, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'

/** Códigos que significan "el usuario cerró/canceló el popup": no son errores. */
const USER_CANCELLED_CODES = new Set([
  'auth/popup-closed-by-user',
  'auth/cancelled-popup-request',
  'auth/user-cancelled',
])

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.8Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.07.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.72-4.95H1.27v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.27a12 12 0 0 0 0 10.76l4.01-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.27 6.62l4.01 3.09C6.22 6.87 8.87 4.77 12 4.77Z"
      />
    </svg>
  )
}

export function LoginScreen() {
  const { signInWithGoogle } = useAuth()
  const [signingIn, setSigningIn] = useState(false)

  const handleSignIn = async () => {
    setSigningIn(true)
    try {
      await signInWithGoogle()
      // Al autenticar, AuthGuard desmonta esta pantalla.
    } catch (error) {
      if (!(error instanceof FirebaseError && USER_CANCELLED_CODES.has(error.code))) {
        console.error('Error al iniciar sesión con Google:', error)
        toast.error('No se pudo iniciar sesión. Inténtalo de nuevo.')
      }
      setSigningIn(false)
    }
  }

  return (
    <div className="relative flex h-dvh items-center justify-center overflow-hidden bg-background px-4">
      {/* Glows de fondo */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-neon-blue/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-neon-coral/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="w-full max-w-sm rounded-2xl border border-border bg-elevated/60 p-8 shadow-[0_0_60px_var(--brand-glow-soft)] backdrop-blur-xl"
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 shadow-[0_0_30px_var(--brand-glow-strong)]">
            <ShieldCheck className="size-7 text-white" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Venta de Seguros
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Herramientas internas para el equipo de ventas
          </p>

          <Button
            onClick={handleSignIn}
            disabled={signingIn}
            className="mt-8 w-full gap-2 rounded-xl border border-border bg-foreground/5 text-foreground transition-all duration-200 hover:scale-[1.02] hover:bg-foreground/10 hover:shadow-[0_0_20px_var(--brand-glow)]"
            size="lg"
          >
            {signingIn ? <LoaderCircle className="size-4 animate-spin" /> : <GoogleIcon />}
            Iniciar sesión con Google
          </Button>

          <p className="mt-6 text-xs text-text-secondary">
            Acceso exclusivo con tu cuenta de Google del equipo.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
