import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { LoaderCircle, MapPin, MapPinned, Navigation, Search, TriangleAlert } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { lookupZip, normalizeZip, type ZipLookupResult } from '@/features/direcciones/zipLookup'

type Estado =
  | { tipo: 'idle' }
  | { tipo: 'loading' }
  | { tipo: 'error'; mensaje: string }
  | { tipo: 'ok'; resultado: ZipLookupResult }

export function ZipLookup({ initialZip }: { initialZip?: string }) {
  const [zip, setZip] = useState(initialZip ?? '')
  const [estado, setEstado] = useState<Estado>({ tipo: 'idle' })
  const abortRef = useRef<AbortController | null>(null)

  const buscar = (value: string) => {
    const clean = normalizeZip(value)
    if (!clean) {
      setEstado({ tipo: 'error', mensaje: 'Ingresa un código postal de 5 dígitos.' })
      return
    }
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    setEstado({ tipo: 'loading' })
    lookupZip(clean, controller.signal)
      .then((resultado) => setEstado({ tipo: 'ok', resultado }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setEstado({ tipo: 'error', mensaje: error instanceof Error ? error.message : 'Error' })
      })
  }

  // Auto-consulta opcional al montar (deep-link / vista previa)
  useEffect(() => {
    if (initialZip && normalizeZip(initialZip)) buscar(initialZip)
    return () => abortRef.current?.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="rounded-2xl border border-border bg-card-bg p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-brand/10">
          <MapPinned className="size-4 text-brand-strong" />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-foreground">Consultar código postal (ZIP)</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Escribe un ZIP y te decimos a qué estado y lugar pertenece.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-1.5">
          <Label htmlFor="zip-lookup">Código postal</Label>
          <Input
            id="zip-lookup"
            type="text"
            inputMode="numeric"
            placeholder="Ej: 11501"
            value={zip}
            maxLength={5}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
            onKeyDown={(e) => e.key === 'Enter' && buscar(zip)}
            className="h-11 rounded-xl text-base"
          />
        </div>
        <Button
          onClick={() => buscar(zip)}
          disabled={estado.tipo === 'loading'}
          size="lg"
          className="h-11 gap-2 rounded-xl bg-gradient-to-r from-brand to-brand-2 text-brand-foreground transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_20px_var(--brand-glow)]"
        >
          {estado.tipo === 'loading' ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Search className="size-4" />
          )}
          Consultar
        </Button>
      </div>

      <div className="mt-4">
        <AnimatePresence mode="wait" initial={false}>
          {estado.tipo === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-2 rounded-xl border border-neon-orange/25 bg-neon-orange/10 px-3 py-2.5 text-sm text-neon-orange"
            >
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              {estado.mensaje}
            </motion.div>
          )}

          {estado.tipo === 'ok' && (
            <motion.div
              key={`ok-${estado.resultado.zip}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="space-y-2"
            >
              {estado.resultado.places.map((place, i) => (
                <div
                  key={`${place.placeName}-${i}`}
                  className="rounded-2xl border border-brand/25 bg-gradient-to-r from-brand/10 to-brand-2/[0.06] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-text-secondary">
                        <MapPin className="size-3 text-brand-strong" />
                        ZIP {estado.resultado.zip}
                      </p>
                      <p className="mt-1 truncate text-xl font-bold tracking-tight text-foreground">
                        {place.placeName}
                      </p>
                      <p className="text-sm text-text-secondary">{place.state}</p>
                    </div>
                    <Badge className="shrink-0 border-brand/40 bg-brand/15 text-sm text-brand-strong">
                      {place.stateAbbr}
                    </Badge>
                  </div>
                  {place.latitude && place.longitude && (
                    <p className="mt-2 flex items-center gap-1 text-[11px] text-text-secondary">
                      <Navigation className="size-3" />
                      {place.latitude}, {place.longitude}
                    </p>
                  )}
                </div>
              ))}
              {estado.resultado.places.length > 1 && (
                <p className="text-[11px] text-text-secondary">
                  Este ZIP cubre {estado.resultado.places.length} localidades.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-text-secondary">
        Consulta en vivo a una base pública (zippopotam.us). Útil para confirmar estado y ciudad de
        un ZIP; para validación postal oficial usa USPS.
      </p>
    </section>
  )
}
