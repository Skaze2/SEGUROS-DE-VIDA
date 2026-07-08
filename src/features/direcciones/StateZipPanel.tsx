import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { AddressEntry } from '@/features/direcciones/addressData'
import { zipRangesFor } from '@/features/direcciones/zipRanges'

function StateZipCard({ entry, defaultOpen = false }: { entry: AddressEntry; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const ranges = zipRangesFor(entry.abbr)
  const hasRanges = ranges.length > 0

  return (
    <div className="mb-2 break-inside-avoid overflow-hidden rounded-xl border border-border bg-card-bg">
      <button
        type="button"
        onClick={() => hasRanges && setOpen((v) => !v)}
        disabled={!hasRanges}
        aria-expanded={open}
        className={cn(
          'flex w-full items-center justify-between gap-3 px-3 py-2 text-left transition-colors duration-200',
          hasRanges && 'hover:bg-foreground/[0.04]',
        )}
      >
        <span className="min-w-0 truncate text-sm text-foreground">{entry.label}</span>
        <span className="flex shrink-0 items-center gap-2">
          <Badge className="border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan">
            {entry.abbr}
          </Badge>
          {hasRanges && (
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="size-4 text-text-secondary" />
            </motion.span>
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && hasRanges && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-3 py-2.5">
              <p className="mb-2 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-text-secondary">
                <MapPin className="size-3 text-neon-cyan" />
                Rangos de códigos postales
              </p>
              <ul className="space-y-1">
                {ranges.map((range) => (
                  <li
                    key={`${entry.abbr}-${range.start}`}
                    className="flex items-center justify-between gap-3 rounded-lg bg-foreground/[0.04] px-2.5 py-1.5"
                  >
                    <span className="font-mono text-xs font-semibold text-brand-strong">
                      {range.prefixLabel}
                    </span>
                    <span className="font-mono text-xs text-text-secondary">
                      {range.start} – {range.end}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
                Cubre todos los ZIP de {entry.label} ({entry.abbr}). Los prefijos de 3 dígitos
                determinan el estado según la asignación oficial del USPS.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function StateZipPanel({
  entries,
  defaultOpenAbbrs,
}: {
  entries: AddressEntry[]
  defaultOpenAbbrs?: string[]
}) {
  return (
    <div className="rounded-2xl border border-border bg-foreground/[0.04] p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-xs font-semibold uppercase text-text-secondary">Estados</h3>
        <span className="rounded-full border border-border bg-foreground/5 px-2 py-0.5 text-xs text-text-secondary">
          {entries.length} registros
        </span>
      </div>

      {entries.length === 0 ? (
        <p className="rounded-xl border border-border bg-card-bg p-4 text-sm text-text-secondary">
          Sin estados que coincidan con la búsqueda.
        </p>
      ) : (
        <div className="max-h-[520px] overflow-y-auto overflow-x-hidden pr-1 [column-gap:0.5rem] md:columns-2 xl:columns-3">
          {entries.map((entry) => (
            <StateZipCard
              key={`${entry.abbr}-${entry.label}`}
              entry={entry}
              defaultOpen={defaultOpenAbbrs?.includes(entry.abbr)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
