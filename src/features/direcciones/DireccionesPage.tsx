import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import {
  CheckCircle2,
  Clipboard,
  Compass,
  LoaderCircle,
  MapPinned,
  Search,
  Sparkles,
  TriangleAlert,
} from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { cn } from '@/lib/utils'
import {
  DIRECTIONAL_ABBREVIATIONS,
  SECONDARY_UNIT_ABBREVIATIONS,
  STATE_ABBREVIATIONS,
  STREET_SUFFIXES,
  type AddressEntry,
} from '@/features/direcciones/addressData'
import {
  analyzeAddress,
  getCategoryResults,
  searchAddressCatalog,
  type AddressFinding,
} from '@/features/direcciones/addressTools'
import { searchExistingStreets, type StreetSearchResult } from '@/features/direcciones/streetSearch'
import { StateZipPanel } from '@/features/direcciones/StateZipPanel'
import { stateMatchesZip } from '@/features/direcciones/zipRanges'

const EXAMPLES = [
  '33134 Main Street 123',
  '742 Evergreen Terrace Springfield Illinois 62704',
  '90210 N Rodeo Drive Beverly Hills California',
]

type CatalogTab = 'states' | 'suffixes' | 'directionals' | 'units'

function CatalogPanel({ title, entries }: { title: string; entries: AddressEntry[] }) {
  return (
    <div className="rounded-2xl border border-border bg-foreground/[0.04] p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-xs font-semibold uppercase text-text-secondary">{title}</h3>
        <span className="rounded-full border border-border bg-foreground/5 px-2 py-0.5 text-xs text-text-secondary">
          {entries.length} registros
        </span>
      </div>
      <div className="grid max-h-[520px] gap-2 overflow-y-auto pr-1 md:grid-cols-2 xl:grid-cols-3">
        {entries.map((entry) => (
          <div
            key={`${title}-${entry.abbr}-${entry.label}`}
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card-bg px-3 py-2"
          >
            <span className="min-w-0 truncate text-sm text-foreground">{entry.label}</span>
            <Badge className="border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan">
              {entry.abbr}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

function FindingItem({ finding }: { finding: AddressFinding }) {
  const isOk = finding.type === 'ok'
  const Icon = isOk ? CheckCircle2 : TriangleAlert

  return (
    <div
      className={cn(
        'rounded-xl border px-3 py-2.5',
        isOk ? 'border-neon-cyan/20 bg-neon-cyan/10' : 'border-neon-orange/25 bg-neon-orange/10',
      )}
    >
      <div className="flex items-start gap-2">
        <Icon
          className={cn(
            'mt-0.5 size-4 shrink-0',
            isOk ? 'text-neon-cyan' : 'text-neon-orange',
          )}
        />
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">{finding.title}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">{finding.detail}</p>
        </div>
      </div>
    </div>
  )
}

export function DireccionesPage() {
  const [address, setAddress] = useState('33134 Main Street 123')
  const [catalogQuery, setCatalogQuery] = useState('')
  const [activeCatalog, setActiveCatalog] = useState<CatalogTab>('states')
  const [streetCity, setStreetCity] = useState('Miami')
  const [streetState, setStreetState] = useState('FL')
  const [streetTerm, setStreetTerm] = useState('Main')
  const [streetResults, setStreetResults] = useState<StreetSearchResult[]>([])
  const [streetLoading, setStreetLoading] = useState(false)
  const [streetError, setStreetError] = useState('')

  const analysis = useMemo(() => analyzeAddress(address), [address])
  const globalResults = useMemo(() => searchAddressCatalog(catalogQuery), [catalogQuery])
  const states = useMemo(() => {
    const base = getCategoryResults(catalogQuery, STATE_ABBREVIATIONS)
    const digits = catalogQuery.replace(/\D/g, '')
    if (digits.length < 2) return base
    // También filtra por código postal: escribir un ZIP o prefijo revela su estado
    const seen = new Set(base.map((entry) => entry.abbr))
    const byZip = STATE_ABBREVIATIONS.filter(
      (state) => !seen.has(state.abbr) && stateMatchesZip(state.abbr, digits),
    )
    return [...base, ...byZip]
  }, [catalogQuery])
  const suffixes = useMemo(
    () => getCategoryResults(catalogQuery, STREET_SUFFIXES),
    [catalogQuery],
  )
  const directionals = useMemo(
    () => getCategoryResults(catalogQuery, DIRECTIONAL_ABBREVIATIONS),
    [catalogQuery],
  )
  const units = useMemo(
    () => getCategoryResults(catalogQuery, SECONDARY_UNIT_ABBREVIATIONS),
    [catalogQuery],
  )
  const catalogTabs = useMemo(
    () => [
      { id: 'states' as const, label: 'Estados', entries: states },
      { id: 'suffixes' as const, label: 'Calles', entries: suffixes },
      { id: 'directionals' as const, label: 'Direccionales', entries: directionals },
      { id: 'units' as const, label: 'Unidades', entries: units },
    ],
    [directionals, states, suffixes, units],
  )
  const selectedCatalog = catalogTabs.find((tab) => tab.id === activeCatalog) ?? catalogTabs[0]

  const copySuggestion = async () => {
    if (!analysis.suggested) return
    await navigator.clipboard.writeText(analysis.suggested)
    toast.success('Direccion sugerida copiada')
  }

  const handleStreetSearch = async () => {
    setStreetLoading(true)
    setStreetError('')
    try {
      const results = await searchExistingStreets(streetCity, streetState, streetTerm)
      setStreetResults(results)
      if (results.length === 0) {
        setStreetError('No encontre calles con ese texto en la ciudad y estado indicados.')
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo buscar calles.'
      setStreetError(message)
      setStreetResults([])
    } finally {
      setStreetLoading(false)
    }
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={fadeUp} className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-2xl border border-border bg-card-bg p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-neon-cyan/10">
              <MapPinned className="size-4 text-neon-cyan" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">Corrector de direcciones USA</h2>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address-input">Direccion a validar</Label>
            <Input
              id="address-input"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Ej: 123 Main Street Miami Florida 33134"
              className="h-11 rounded-xl"
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setAddress(example)}
                className="rounded-full border border-border bg-foreground/[0.04] px-3 py-1.5 text-xs text-text-secondary transition-colors hover:border-neon-cyan/30 hover:text-foreground"
              >
                {example}
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-brand/25 bg-gradient-to-r from-brand/15 to-brand-2/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase text-text-secondary">
                  Sugerencia normalizada
                </p>
                <p className="mt-1 break-words text-2xl font-bold tracking-tight text-foreground">
                  {analysis.suggested || 'Sin sugerencia aun'}
                </p>
              </div>
              <Button
                onClick={() => void copySuggestion()}
                disabled={!analysis.suggested}
                size="icon-lg"
                aria-label="Copiar direccion sugerida"
                className="shrink-0 rounded-xl bg-foreground/10 text-foreground hover:bg-foreground/15"
              >
                <Clipboard className="size-4" />
              </Button>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-text-secondary">
              Esta herramienta corrige orden y abreviaturas de formato postal. No confirma si la
              direccion existe fisicamente sin consultar una base oficial externa.
            </p>
          </div>

          <div className="mt-5 grid gap-3">
            {analysis.findings.map((finding) => (
              <FindingItem key={`${finding.title}-${finding.detail}`} finding={finding} />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card-bg p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-neon-blue/10">
              <Compass className="size-4 text-neon-blue" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">Abreviaturas detectadas</h2>
          </div>

          <div className="space-y-2">
            {analysis.matches.length > 0 ? (
              analysis.matches.map((entry) => (
                <div
                  key={`${entry.abbr}-${entry.label}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border bg-foreground/[0.04] px-3 py-2.5"
                >
                  <span className="min-w-0 truncate text-sm text-foreground">{entry.label}</span>
                  <Badge className="border-brand/30 bg-brand/10 text-brand-strong">
                    {entry.abbr}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="rounded-xl border border-border bg-foreground/[0.04] p-4 text-sm text-text-secondary">
                Las coincidencias apareceran mientras escribes estados, tipos de calle,
                apartamentos o direccionales.
              </p>
            )}
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-foreground/[0.04] p-4">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="size-4 text-neon-orange" />
              <h3 className="text-sm font-semibold text-foreground">Regla rapida</h3>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              Secuencia recomendada: numero de casa, direccion de calle, ciudad, estado abreviado y
              ZIP. Ejemplo: 123 MAIN ST MIAMI FL 33134.
            </p>
          </div>
        </section>
      </motion.div>

      <motion.section
        variants={fadeUp}
        className="rounded-2xl border border-border bg-card-bg p-5 sm:p-6"
      >
        <div className="mb-5 flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-neon-blue/10">
            <Search className="size-4 text-neon-blue" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-foreground">Calles existentes</h2>
            <p className="mt-1 text-sm text-text-secondary">
              Busca nombres reales de calles y avenidas por ciudad y estado.
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-[1fr_120px_1fr_auto]">
          <div className="space-y-2">
            <Label htmlFor="street-city">Ciudad</Label>
            <Input
              id="street-city"
              value={streetCity}
              onChange={(event) => setStreetCity(event.target.value)}
              placeholder="Ej: Miami"
              className="h-10 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="street-state">Estado</Label>
            <Input
              id="street-state"
              value={streetState}
              onChange={(event) => setStreetState(event.target.value.toUpperCase().slice(0, 2))}
              placeholder="FL"
              className="h-10 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="street-term">Calle o avenida</Label>
            <Input
              id="street-term"
              value={streetTerm}
              onChange={(event) => setStreetTerm(event.target.value)}
              placeholder="Ej: Flagler, Main, Ocean"
              className="h-10 rounded-xl"
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={() => void handleStreetSearch()}
              disabled={streetLoading}
              size="lg"
              className="w-full gap-2 rounded-xl bg-gradient-to-r from-brand to-brand-2 text-brand-foreground transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_20px_var(--brand-glow)] md:w-auto"
            >
              {streetLoading ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Search className="size-4" />
              )}
              Buscar
            </Button>
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-text-secondary">
          Resultados basados en OpenStreetMap/Overpass. Son utiles para confirmar nombres reales,
          pero no reemplazan una validacion postal oficial de USPS.
        </p>

        {streetError && (
          <div className="mt-4 rounded-xl border border-neon-orange/25 bg-neon-orange/10 px-3 py-2.5 text-sm text-neon-orange">
            {streetError}
          </div>
        )}

        {streetResults.length > 0 && (
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {streetResults.map((street) => (
              <button
                key={`${street.osmType}-${street.id}`}
                type="button"
                onClick={() =>
                  setAddress(`123 ${street.normalizedName} ${streetCity} ${streetState}`)
                }
                className="rounded-2xl border border-border bg-foreground/[0.04] p-4 text-left transition-all duration-200 hover:border-neon-cyan/30 hover:bg-foreground/[0.06]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{street.name}</p>
                    <p className="mt-1 text-xs text-text-secondary">{street.normalizedName}</p>
                  </div>
                  <Badge className="border-neon-blue/30 bg-neon-blue/10 text-neon-blue">
                    {street.highway}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        )}
      </motion.section>

      <motion.section
        variants={fadeUp}
        className="rounded-2xl border border-border bg-card-bg p-5 sm:p-6"
      >
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-neon-orange/10">
                <Search className="size-4 text-neon-orange" />
              </div>
              <h2 className="text-sm font-semibold text-foreground">Buscador de abreviaturas</h2>
            </div>
            <p className="text-sm text-text-secondary">
              Busca estados (con sus códigos postales), calles, unidades secundarias y
              direccionales.
            </p>
          </div>
          <div className="w-full sm:max-w-xs">
            <Label htmlFor="catalog-search" className="sr-only">
              Buscar abreviatura
            </Label>
            <Input
              id="catalog-search"
              value={catalogQuery}
              onChange={(event) => setCatalogQuery(event.target.value)}
              placeholder="Ej: Florida, 33101, Street, Noroeste"
              className="h-10 rounded-xl"
            />
          </div>
        </div>

        {catalogQuery && (
          <div className="mb-5 flex flex-wrap gap-2">
            {globalResults.map((entry) => (
              <Badge
                key={`global-${entry.abbr}-${entry.label}`}
                className="border-border bg-foreground/5 text-foreground"
              >
                {entry.label}: {entry.abbr}
              </Badge>
            ))}
          </div>
        )}

        <div
          role="tablist"
          aria-label="Filtros de abreviaturas"
          className="mb-4 grid gap-2 sm:grid-cols-4"
        >
          {catalogTabs.map((tab) => {
            const selected = tab.id === activeCatalog
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveCatalog(tab.id)}
                className={cn(
                  'flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-left transition-all duration-200',
                  selected
                    ? 'border-brand/40 bg-gradient-to-r from-brand/20 to-brand-2/10 text-foreground shadow-[0_0_20px_var(--brand-glow-soft)]'
                    : 'border-border bg-foreground/[0.04] text-text-secondary hover:border-foreground/20 hover:bg-foreground/[0.06] hover:text-foreground',
                )}
              >
                <span className="text-sm font-semibold">{tab.label}</span>
                <span
                  className={cn(
                    'rounded-full border px-2 py-0.5 text-xs',
                    selected
                      ? 'border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan'
                      : 'border-border bg-foreground/5 text-text-secondary',
                  )}
                >
                  {tab.entries.length}
                </span>
              </button>
            )
          })}
        </div>

        {activeCatalog === 'states' ? (
          <StateZipPanel entries={selectedCatalog.entries} />
        ) : (
          <CatalogPanel title={selectedCatalog.label} entries={selectedCatalog.entries} />
        )}
      </motion.section>
    </motion.div>
  )
}
