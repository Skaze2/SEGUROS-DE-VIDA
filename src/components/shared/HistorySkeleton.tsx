import { cn } from '@/lib/utils'

function ShimmerBlock({ className }: { className?: string }) {
  return (
    <div className={cn('relative overflow-hidden rounded-lg bg-foreground/5', className)}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
    </div>
  )
}

export function HistorySkeleton() {
  return (
    <div className="space-y-3">
      {[0, 1, 2].map((row) => (
        <div key={row} className="rounded-2xl border border-border bg-card-bg p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 space-y-2">
              <ShimmerBlock className="h-4 w-2/5" />
              <ShimmerBlock className="h-3 w-3/5" />
            </div>
            <ShimmerBlock className="h-8 w-24 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  )
}
