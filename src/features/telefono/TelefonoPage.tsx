import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Info, MapPin, Phone, PhoneCall, Search, TriangleAlert } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { AREA_CODES, isNonGeographic, lookupAreaCode, parsePhone } from '@/features/telefono/areaCodes'

const EXAMPLES = ['+1 (212) 555-0182', '305-555-0147', '13125550190']

export function TelefonoPage({ initialPhone = '' }: { initialPhone?: string }) {
  const [phone, setPhone] = useState(initialPhone)
  const [submitted, setSubmitted] = useState(initialPhone)

  const parse = useMemo(() => parsePhone(submitted), [submitted])
  const area = parse.areaCode ? lookupAreaCode(parse.areaCode) : undefined

  const consultar = (value: string) => setSubmitted(value)

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
      <motion.section
        variants={fadeUp}
        className="rounded-2xl border border-border bg-card-bg p-5 sm:p-6"
      >
        <div className="mb-5 flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-2 shadow-[0_0_20px_var(--brand-glow)]">
            <PhoneCall className="size-5 text-brand-foreground" />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-foreground">Origen de número telefónico</h2>
            <p className="text-sm text-text-secondary">
              Escribe un número de EE. UU. y te decimos de qué estado y región proviene su
              indicativo (área).
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="phone-input">Número de teléfono</Label>
            <Input
              id="phone-input"
              type="tel"
              inputMode="tel"
              placeholder="Ej: +1 (212) 555-0182"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && consultar(phone)}
              className="h-11 rounded-xl text-base"
            />
          </div>
          <Button
            onClick={() => consultar(phone)}
            size="lg"
            className="h-11 gap-2 rounded-xl bg-gradient-to-r from-brand to-brand-2 text-brand-foreground transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_20px_var(--brand-glow)]"
          >
            <Search className="size-4" />
            Consultar
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => {
                setPhone(ex)
                consultar(ex)
              }}
              className="rounded-full border border-border bg-foreground/[0.04] px-3 py-1.5 text-xs text-text-secondary transition-colors hover:border-brand/30 hover:text-foreground"
            >
              {ex}
            </button>
          ))}
        </div>

        {/* Resultado */}
        <div className="mt-4">
          <AnimatePresence mode="wait" initial={false}>
            {submitted && !parse.areaCode && (
              <motion.div
                key="short"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-start gap-2 rounded-xl border border-neon-orange/25 bg-neon-orange/10 px-3 py-2.5 text-sm text-neon-orange"
              >
                <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                Escribe al menos los 3 dígitos del indicativo (área).
              </motion.div>
            )}

            {submitted && parse.areaCode && !area && (
              <motion.div
                key="unknown"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-start gap-2 rounded-xl border border-neon-orange/25 bg-neon-orange/10 px-3 py-2.5 text-sm text-neon-orange"
              >
                <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                El indicativo {parse.areaCode} no corresponde a un área conocida de EE. UU.
              </motion.div>
            )}

            {submitted && area && (
              <motion.div
                key={`ok-${area.code}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="rounded-2xl border border-brand/25 bg-gradient-to-r from-brand/10 to-brand-2/[0.06] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-text-secondary">
                      <Phone className="size-3 text-brand-strong" />
                      Indicativo {area.code}
                    </p>
                    {isNonGeographic(area) ? (
                      <p className="mt-1 text-xl font-bold tracking-tight text-foreground">
                        {area.region}
                      </p>
                    ) : (
                      <>
                        <p className="mt-1 flex items-center gap-1.5 text-xl font-bold tracking-tight text-foreground">
                          <MapPin className="size-4 text-brand-strong" />
                          {area.region}
                        </p>
                        <p className="text-sm text-text-secondary">{area.state}</p>
                      </>
                    )}
                  </div>
                  {area.stateAbbr && (
                    <Badge className="shrink-0 border-brand/40 bg-brand/15 text-sm text-brand-strong">
                      {area.stateAbbr}
                    </Badge>
                  )}
                </div>

                {!isNonGeographic(area) && (
                  <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-foreground/[0.04] px-2.5 py-2 text-[11px] leading-relaxed text-text-secondary">
                    <Info className="mt-0.5 size-3 shrink-0" />
                    El indicativo indica el ORIGEN del número. Si la persona se mudó, puede conservarlo
                    aunque hoy viva en otro estado — es una pista, no su ubicación actual.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-text-secondary">
          Biblioteca local de {AREA_CODES.length} indicativos (NANP de EE. UU.). No consulta servicios
          externos. Los números portados o VoIP pueden no reflejar la ubicación real.
        </p>
      </motion.section>
    </motion.div>
  )
}
