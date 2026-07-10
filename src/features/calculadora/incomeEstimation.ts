import { round2 } from '@/lib/money'
import type { IncomePeriod, PeriodMethod } from '@/types/calculadora'

/** 52 semanas / 12 meses = 4.3333 semanas por mes (mantiene el año en 52 semanas). */
export const WEEKS_PER_MONTH = 52 / 12
export const DEFAULT_HOURS_PER_WEEK = 40

export const MESES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

export const MESES_CORTOS = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
]

export const METHOD_OPTIONS: { value: PeriodMethod; label: string; hint: string }[] = [
  { value: 'fijo', label: 'Monto fijo', hint: 'Total del periodo' },
  { value: 'semanal', label: 'Semanal', hint: '× semanas' },
  { value: 'hora', label: 'Por hora', hint: '× horas × semanas' },
]

/** Cantidad de meses (inclusive) en el rango. */
export function monthsInRange(startMonth: number, endMonth: number): number {
  return Math.max(0, endMonth - startMonth + 1)
}

/** Semanas del rango de meses (meses × 52/12). Ej: 3 meses = 13 semanas. */
export function weeksInRange(startMonth: number, endMonth: number): number {
  return monthsInRange(startMonth, endMonth) * WEEKS_PER_MONTH
}

/** Ingreso estimado de un periodo según su método. */
export function periodIncome(period: IncomePeriod): number {
  const weeks = weeksInRange(period.startMonth, period.endMonth)
  switch (period.method) {
    case 'fijo':
      return round2(period.value)
    case 'semanal':
      return round2(period.value * weeks)
    case 'hora':
      return round2(period.value * (period.hoursPerWeek || DEFAULT_HOURS_PER_WEEK) * weeks)
  }
}

/** Ingreso anual total = suma de todos los periodos. */
export function totalVariableIncome(periods: IncomePeriod[]): number {
  return round2(periods.reduce((sum, p) => sum + periodIncome(p), 0))
}

/** Meses cubiertos por al menos un periodo (para "meses cubiertos: X/12"). */
export function coveredMonths(periods: IncomePeriod[]): number {
  const set = new Set<number>()
  for (const p of periods) {
    for (let m = p.startMonth; m <= p.endMonth; m += 1) set.add(m)
  }
  return set.size
}

/** ¿Hay meses cubiertos por más de un periodo (solapamiento)? */
export function hasOverlap(periods: IncomePeriod[]): boolean {
  const counts = new Array(12).fill(0)
  for (const p of periods) {
    for (let m = p.startMonth; m <= p.endMonth; m += 1) {
      if (m >= 0 && m < 12) counts[m] += 1
    }
  }
  return counts.some((c) => c > 1)
}

/** Etiqueta compacta del rango, p.ej. "Ene – Mar". */
export function rangeLabel(startMonth: number, endMonth: number): string {
  return startMonth === endMonth
    ? MESES_CORTOS[startMonth]
    : `${MESES_CORTOS[startMonth]} – ${MESES_CORTOS[endMonth]}`
}
