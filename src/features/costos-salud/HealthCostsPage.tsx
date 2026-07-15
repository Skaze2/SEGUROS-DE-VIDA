import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  Clock,
  HeartPulse,
  Info,
  LayoutList,
  Lightbulb,
  Search,
  X,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { formatUSDWhole } from '@/lib/money'
import {
  CATEGORY_ICONS,
  HEALTH_COSTS,
  TOTAL_COST_ITEMS,
  type HealthCostCategory,
  type HealthCostItem,
} from '@/features/costos-salud/healthCostsData'

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

function itemMatches(item: HealthCostItem, query: string) {
  if (!query) return true
  const haystack = normalize(
    [item.name, item.aka ?? '', item.extra ?? '', item.talkingPoint].join(' '),
  )
  return haystack.includes(query)
}

function CostBadge({ item }: { item: HealthCostItem }) {
  const range =
    item.costLow === item.costHigh
      ? formatUSDWhole(item.costLow)
      : `${formatUSDWhole(item.costLow)} – ${formatUSDWhole(item.costHigh)}`
  return (
    <div className="shrink-0 text-right">
      <p className="bg-gradient-to-r from-brand to-brand-2 bg-clip-text text-sm font-bold text-transparent sm:text-base">
        {range}
      </p>
      <p className="text-[10px] text-text-secondary">{item.unit}</p>
    </div>
  )
}

function ItemCard({ item, categoryLabel }: { item: HealthCostItem; categoryLabel?: string }) {
  return (
    <div className="mb-3 break-inside-avoid rounded-xl border border-border bg-card-bg p-4 transition-colors duration-200 hover:border-brand/30">
      {categoryLabel && (
        <span className="mb-1.5 inline-block rounded-full border border-border bg-foreground/5 px-2 py-0.5 text-[10px] text-text-secondary">
          {categoryLabel}
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-foreground">{item.name}</h4>
          {item.aka && <p className="text-xs italic text-text-secondary">{item.aka}</p>}
        </div>
        <CostBadge item={item} />
      </div>

      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-text-secondary">
        {item.recovery && (
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3 text-neon-cyan" />
            Recuperación: {item.recovery}
          </span>
        )}
        {item.extra && <span className="inline-flex items-center gap-1">· {item.extra}</span>}
      </div>

      <p className="mt-2 flex items-start gap-1.5 rounded-lg bg-brand/[0.06] px-2.5 py-1.5 text-[11px] leading-relaxed text-text-secondary">
        <Lightbulb className="mt-0.5 size-3 shrink-0 text-neon-orange" />
        {item.talkingPoint}
      </p>
    </div>
  )
}

function CategoryBlock({ category }: { category: HealthCostCategory }) {
  const Icon = CATEGORY_ICONS[category.id] ?? HeartPulse
  return (
    <section>
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-brand/10">
          <Icon className="size-4 text-brand-strong" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">{category.title}</h3>
        <span className="rounded-full border border-border bg-foreground/5 px-2 py-0.5 text-xs text-text-secondary">
          {category.items.length}
        </span>
      </div>
      <div className="[column-gap:0.75rem] md:columns-2 xl:columns-3">
        {category.items.map((item) => (
          <ItemCard key={`${category.id}-${item.name}`} item={item} />
        ))}
      </div>
    </section>
  )
}

type SortMode = 'category' | 'price-desc' | 'price-asc'

const SORT_OPTIONS: { id: SortMode; label: string; icon: typeof LayoutList }[] = [
  { id: 'category', label: 'Por categoría', icon: LayoutList },
  { id: 'price-desc', label: 'Mayor precio', icon: ArrowDownWideNarrow },
  { id: 'price-asc', label: 'Menor precio', icon: ArrowUpNarrowWide },
]

export function HealthCostsPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [sortMode, setSortMode] = useState<SortMode>('category')
  const normalizedQuery = normalize(query)

  const filtered = useMemo(() => {
    return HEALTH_COSTS.map((category) => ({
      ...category,
      items: category.items.filter((item) => itemMatches(item, normalizedQuery)),
    })).filter(
      (category) =>
        (activeCategory === 'all' || category.id === activeCategory) && category.items.length > 0,
    )
  }, [normalizedQuery, activeCategory])

  // Al ordenar por precio: lista plana global de mayor a menor (o viceversa) por el tope del rango.
  const flatSorted = useMemo(() => {
    if (sortMode === 'category') return null
    const items = filtered.flatMap((c) =>
      c.items.map((item) => ({ item, catId: c.id, catTitle: c.title })),
    )
    items.sort((a, b) =>
      sortMode === 'price-desc'
        ? b.item.costHigh - a.item.costHigh || b.item.costLow - a.item.costLow
        : a.item.costHigh - b.item.costHigh || a.item.costLow - b.item.costLow,
    )
    return items
  }, [filtered, sortMode])

  const shownCount = filtered.reduce((sum, category) => sum + category.items.length, 0)

  const chips = useMemo(
    () => [
      { id: 'all', title: 'Todos', count: TOTAL_COST_ITEMS },
      ...HEALTH_COSTS.map((c) => ({ id: c.id, title: c.title, count: c.items.length })),
    ],
    [],
  )

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
      <motion.section
        variants={fadeUp}
        className="rounded-2xl border border-border bg-card-bg p-5 sm:p-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-2 shadow-[0_0_20px_var(--brand-glow)]">
              <HeartPulse className="size-5 text-brand-foreground" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Estándares de costos de salud</h2>
              <p className="text-sm text-text-secondary">
                Cuánto cuestan los escenarios de salud SIN seguro — para conversar sobre prevención y
                ahorro con el cliente.
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-border bg-foreground/5 px-3 py-1 text-xs text-text-secondary">
            {shownCount} de {TOTAL_COST_ITEMS} escenarios
          </span>
        </div>

        <div className="relative mt-5">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar escenario o medicina… (ej: tobillo, Ozempic, emergencias)"
            className="h-12 rounded-xl pl-10 pr-10 text-base"
            aria-label="Buscar costo de salud"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Limpiar búsqueda"
              className="absolute right-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-foreground/10 hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {chips.map((chip) => {
            const selected = chip.id === activeCategory
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setActiveCategory(chip.id)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200',
                  selected
                    ? 'border-brand/40 bg-gradient-to-r from-brand/20 to-brand-2/10 text-foreground shadow-[0_0_16px_var(--brand-glow-soft)]'
                    : 'border-border bg-foreground/[0.04] text-text-secondary hover:border-foreground/20 hover:text-foreground',
                )}
              >
                {chip.title}
                <span
                  className={cn(
                    'rounded-full px-1.5 text-[10px]',
                    selected ? 'bg-foreground/10 text-foreground' : 'bg-foreground/5',
                  )}
                >
                  {chip.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Orden */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wide text-text-secondary">
            Ordenar:
          </span>
          {SORT_OPTIONS.map((opt) => {
            const selected = opt.id === sortMode
            const Icon = opt.icon
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSortMode(opt.id)}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all duration-200',
                  selected
                    ? 'border-brand/40 bg-brand/15 text-brand-strong'
                    : 'border-border bg-foreground/[0.04] text-text-secondary hover:border-foreground/20 hover:text-foreground',
                )}
              >
                <Icon className="size-3.5" />
                {opt.label}
              </button>
            )
          })}
        </div>

        <p className="mt-4 flex items-start gap-1.5 rounded-xl border border-neon-orange/20 bg-neon-orange/[0.06] px-3 py-2 text-[11px] leading-relaxed text-text-secondary">
          <Info className="mt-0.5 size-3.5 shrink-0 text-neon-orange" />
          Rangos ESTIMADOS de referencia (precio sin seguro / lista). Varían mucho por estado,
          proveedor y plan; no son cotizaciones. Úsalos como apoyo de conversación, no como precio
          garantizado.
          {sortMode !== 'category' && (
            <span className="ml-1 text-text-secondary">
              El orden por precio compara el tope del rango; ojo que las unidades varían (por mes,
              por año, tratamiento…).
            </span>
          )}
        </p>
      </motion.section>

      {filtered.length === 0 ? (
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-dashed border-border bg-foreground/[0.02] px-4 py-12 text-center"
        >
          <Search className="mx-auto mb-3 size-6 text-text-secondary" />
          <p className="text-sm text-text-secondary">
            No se encontraron escenarios para «{query}».
          </p>
        </motion.div>
      ) : flatSorted ? (
        <motion.div
          key={sortMode}
          variants={fadeUp}
          className="grid grid-cols-1 items-start gap-x-3 md:grid-cols-2 xl:grid-cols-3"
        >
          {flatSorted.map(({ item, catId, catTitle }) => (
            <ItemCard key={`${catId}-${item.name}`} item={item} categoryLabel={catTitle} />
          ))}
        </motion.div>
      ) : (
        <motion.div variants={fadeUp} className="space-y-8">
          {filtered.map((category) => (
            <CategoryBlock key={category.id} category={category} />
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
