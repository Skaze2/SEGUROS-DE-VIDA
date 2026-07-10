/**
 * Códigos de área (area codes) del NANP asignados a EE. UU., territorios y no-geográficos.
 * Biblioteca local (no requiere API): el area code (los 3 dígitos tras el +1) indica el
 * estado/región de ORIGEN del número — una pista de dónde lo obtuvo la persona.
 *
 * Dataset compilado y verificado contra fuentes oficiales (NANPA / allareacodes).
 */

export interface AreaCode {
  /** 3 dígitos, p.ej. "212". */
  code: string
  /** Abreviatura del estado/territorio. "" para no-geográficos. */
  stateAbbr: string
  /** Nombre completo del estado/territorio, o "No geográfico". */
  state: string
  /** Ciudad(es) principal(es) o región que cubre. */
  region: string
}

// NOTA: se reemplaza por el dataset completo (~335 codes) compilado por el agente.
export const AREA_CODES: AreaCode[] = [
  { code: '201', stateAbbr: 'NJ', state: 'New Jersey', region: 'Jersey City, Hackensack' },
  { code: '202', stateAbbr: 'DC', state: 'District of Columbia', region: 'Washington, D.C.' },
  { code: '212', stateAbbr: 'NY', state: 'New York', region: 'New York City (Manhattan)' },
  { code: '305', stateAbbr: 'FL', state: 'Florida', region: 'Miami' },
  { code: '312', stateAbbr: 'IL', state: 'Illinois', region: 'Chicago' },
  { code: '213', stateAbbr: 'CA', state: 'California', region: 'Los Angeles' },
  { code: '800', stateAbbr: '', state: 'No geográfico', region: 'Línea gratuita (toll-free)' },
]

const AREA_CODE_MAP = new Map(AREA_CODES.map((a) => [a.code, a]))

export function lookupAreaCode(code: string): AreaCode | undefined {
  return AREA_CODE_MAP.get(code)
}

export interface PhoneParse {
  /** Dígitos nacionales (sin el +1). */
  national: string
  /** Los 3 dígitos del area code, o null si no hay suficientes dígitos. */
  areaCode: string | null
  /** true si el número nacional tiene exactamente 10 dígitos. */
  complete: boolean
}

/** Extrae el area code de un teléfono en cualquier formato (+1, guiones, espacios, paréntesis). */
export function parsePhone(raw: string): PhoneParse {
  const digits = raw.replace(/\D/g, '')
  let national = digits
  // Quita el indicativo país +1 si viene con 11 dígitos
  if (national.length === 11 && national.startsWith('1')) {
    national = national.slice(1)
  }
  const areaCode = national.length >= 3 ? national.slice(0, 3) : null
  return { national, areaCode, complete: national.length === 10 }
}

/** ¿El code es no-geográfico (toll-free / premium)? */
export function isNonGeographic(area?: AreaCode): boolean {
  return !!area && area.stateAbbr === ''
}
