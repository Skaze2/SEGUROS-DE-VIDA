import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { BookOpen, Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { cn } from '@/lib/utils'
import {
  DICTIONARY,
  TOTAL_TERMS,
  type DictionaryCategory,
  type DictionaryTerm,
} from '@/features/diccionario/diccionarioData'

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

function termMatches(term: DictionaryTerm, query: string) {
  if (!query) return true
  const haystack = normalize([term.term, term.aka ?? '', term.definition].join(' '))
  return haystack.includes(query)
}

function TermCard({ term }: { term: DictionaryTerm }) {
  return (
    <div className="mb-3 break-inside-avoid rounded-xl border border-border bg-card-bg p-4 transition-colors duration-200 hover:border-brand/30">
      <h4 className="text-sm font-semibold text-brand-strong">{term.term}</h4>
      {term.aka && <p className="mt-0.5 text-xs italic text-text-secondary">{term.aka}</p>}
      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{term.definition}</p>
    </div>
  )
}

function CategoryBlock({ category }: { category: DictionaryCategory }) {
  const Icon = category.icon
  return (
    <section>
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-brand/10">
          <Icon className="size-4 text-brand-strong" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">{category.title}</h3>
        <span className="rounded-full border border-border bg-foreground/5 px-2 py-0.5 text-xs text-text-secondary">
          {category.terms.length}
        </span>
      </div>
      <div className="[column-gap:0.75rem] md:columns-2 xl:columns-3">
        {category.terms.map((term) => (
          <TermCard key={`${category.id}-${term.term}`} term={term} />
        ))}
      </div>
    </section>
  )
}

export function DiccionarioPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const normalizedQuery = normalize(query)

  const filtered = useMemo(() => {
    return DICTIONARY.map((category) => ({
      ...category,
      terms: category.terms.filter((term) => termMatches(term, normalizedQuery)),
    })).filter(
      (category) =>
        (activeCategory === 'all' || category.id === activeCategory) && category.terms.length > 0,
    )
  }, [normalizedQuery, activeCategory])

  const shownCount = filtered.reduce((sum, category) => sum + category.terms.length, 0)

  const chips = useMemo(
    () => [
      { id: 'all', title: 'Todos', count: TOTAL_TERMS },
      ...DICTIONARY.map((category) => ({
        id: category.id,
        title: category.title,
        count: category.terms.length,
      })),
    ],
    [],
  )

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
      {/* Encabezado + buscador */}
      <motion.section
        variants={fadeUp}
        className="rounded-2xl border border-border bg-card-bg p-5 sm:p-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-2 shadow-[0_0_20px_var(--brand-glow)]">
              <BookOpen className="size-5 text-brand-foreground" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Diccionario de términos</h2>
              <p className="text-sm text-text-secondary">
                Glosario de seguros, subsidios e impuestos para el equipo de ventas.
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-border bg-foreground/5 px-3 py-1 text-xs text-text-secondary">
            {shownCount} de {TOTAL_TERMS} términos
          </span>
        </div>

        <div className="relative mt-5">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar término, sigla o definición… (ej: FPL, subsidio, deducible)"
            className="h-12 rounded-xl pl-10 pr-10 text-base"
            aria-label="Buscar término"
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

        {/* Chips de categoría */}
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
      </motion.section>

      {/* Resultados */}
      {filtered.length === 0 ? (
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-dashed border-border bg-foreground/[0.02] px-4 py-12 text-center"
        >
          <Search className="mx-auto mb-3 size-6 text-text-secondary" />
          <p className="text-sm text-text-secondary">
            No se encontraron términos para «{query}».
            <br />
            Prueba con otra palabra o revisa otra categoría.
          </p>
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
