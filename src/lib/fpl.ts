/**
 * Guías Federales de Pobreza (FPL) — HHS 2025, 48 estados contiguos + DC.
 * Aplican a la cobertura del Marketplace 2026.
 *
 * Para actualizar con la publicación anual del HHS basta con cambiar
 * FPL_YEAR, FPL_BASE y FPL_PER_ADDITIONAL.
 */
export const FPL_YEAR = 2025
export const FPL_BASE = 15_650
export const FPL_PER_ADDITIONAL = 5_500

export function fplThreshold(householdSize: number): number {
  return FPL_BASE + (Math.max(1, householdSize) - 1) * FPL_PER_ADDITIONAL
}

/** % FPL redondeado a 1 decimal. */
export function fplPercent(totalIncome: number, householdSize: number): number {
  return Math.round((totalIncome / fplThreshold(householdSize)) * 1000) / 10
}

export interface FplBand {
  max: number
  label: string
  /** Color hex del acento asociado a la banda. */
  color: string
}

export const FPL_BANDS: readonly FplBand[] = [
  { max: 100, label: 'Menos de 100% FPL', color: '#FF3D6E' },
  { max: 138, label: '100% – 138% FPL', color: '#FF8A3D' },
  { max: 150, label: '138% – 150% FPL', color: '#2FD9FF' },
  { max: 250, label: '150% – 250% FPL', color: '#2F6BFF' },
  { max: 400, label: '250% – 400% FPL', color: '#7B2FFF' },
  { max: Infinity, label: 'Más de 400% FPL', color: '#C93EFF' },
]

export function fplBand(percent: number): FplBand {
  return FPL_BANDS.find((band) => percent < band.max) ?? FPL_BANDS[FPL_BANDS.length - 1]
}
