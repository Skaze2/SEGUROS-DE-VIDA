/**
 * Guías Federales de Pobreza (FPL) — HHS 2025. Aplican a la cobertura del Marketplace 2026.
 *
 * El FPL es FEDERAL: los 48 estados contiguos + DC comparten una sola tabla.
 * Las únicas jurisdicciones con tabla propia (más alta, por costo de vida) son
 * Alaska y Hawái. Fuente: Federal Register 90 FR 5917 (17-ene-2025) / ASPE HHS.
 *
 * Para actualizar con la publicación anual del HHS basta con cambiar
 * FPL_YEAR y las tres entradas de FPL_TABLES.
 */
export const FPL_YEAR = 2025

export type FplJurisdiction = 'contiguous' | 'AK' | 'HI'

export const FPL_TABLES: Record<
  FplJurisdiction,
  { base: number; perAdditional: number; label: string }
> = {
  contiguous: { base: 15_650, perAdditional: 5_500, label: '48 estados + DC' },
  AK: { base: 19_550, perAdditional: 6_880, label: 'Alaska' },
  HI: { base: 17_990, perAdditional: 6_330, label: 'Hawái' },
}

/** Jurisdicción FPL según la abreviatura del estado (AK y HI tienen tabla propia). */
export function fplJurisdictionFor(stateAbbr?: string | null): FplJurisdiction {
  if (stateAbbr === 'AK') return 'AK'
  if (stateAbbr === 'HI') return 'HI'
  return 'contiguous'
}

export function fplThreshold(
  householdSize: number,
  jurisdiction: FplJurisdiction = 'contiguous',
): number {
  const table = FPL_TABLES[jurisdiction]
  return table.base + (Math.max(1, householdSize) - 1) * table.perAdditional
}

/** % FPL redondeado a 1 decimal. */
export function fplPercent(
  totalIncome: number,
  householdSize: number,
  jurisdiction: FplJurisdiction = 'contiguous',
): number {
  return Math.round((totalIncome / fplThreshold(householdSize, jurisdiction)) * 1000) / 10
}

export interface FplBand {
  max: number
  label: string
  /** Color hex del acento asociado a la banda. */
  color: string
}

// Escala salud/calma: cálido (bajo ingreso) → azul cielo/teal (alto ingreso).
// Colores de saturación media: legibles como puntos y texto corto en ambos temas.
export const FPL_BANDS: readonly FplBand[] = [
  { max: 100, label: 'Menos de 100% FPL', color: '#F43F5E' },
  { max: 138, label: '100% – 138% FPL', color: '#FB923C' },
  { max: 150, label: '138% – 150% FPL', color: '#22D3EE' },
  { max: 250, label: '150% – 250% FPL', color: '#38BDF8' },
  { max: 400, label: '250% – 400% FPL', color: '#0EA5E9' },
  { max: Infinity, label: 'Más de 400% FPL', color: '#2DD4BF' },
]

export function fplBand(percent: number): FplBand {
  return FPL_BANDS.find((band) => percent < band.max) ?? FPL_BANDS[FPL_BANDS.length - 1]
}
