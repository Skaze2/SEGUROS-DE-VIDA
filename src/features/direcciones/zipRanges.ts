/**
 * Rangos de códigos postales (ZIP) por estado de EE.UU.
 *
 * Basado en la asignación oficial de prefijos ZIP del USPS: los primeros 3 dígitos
 * de un ZIP (el "SCF" / Sectional Center Facility) determinan el estado. Cada rango
 * cubre TODOS los ZIP de ese bloque de prefijos; algunos prefijos intermedios pueden
 * no estar asignados a una oficina, pero pertenecen a la región de ese estado.
 *
 * Formato: [inicio5, fin5] en dígitos de 5. Un estado puede tener varios bloques.
 * Para actualizar: los prefijos ZIP son muy estables; solo cambian si el USPS
 * reasigna un SCF (muy poco frecuente).
 */
export const STATE_ZIP_RANGES: Record<string, [string, string][]> = {
  AL: [['35000', '36999']],
  AK: [['99500', '99999']],
  AZ: [['85000', '86599']],
  AR: [['71600', '72999']],
  CA: [['90000', '96199']],
  CO: [['80000', '81699']],
  CT: [['06000', '06999']],
  DE: [['19700', '19999']],
  DC: [['20000', '20099'], ['20200', '20599']],
  FL: [['32000', '34999']],
  GA: [['30000', '31999'], ['39800', '39999']],
  HI: [['96700', '96798'], ['96800', '96899']],
  ID: [['83200', '83899']],
  IL: [['60000', '62999']],
  IN: [['46000', '47999']],
  IA: [['50000', '52899']],
  KS: [['66000', '67999']],
  KY: [['40000', '42799']],
  LA: [['70000', '71499']],
  ME: [['03900', '04999']],
  MD: [['20600', '21999']],
  MA: [['01000', '02799']],
  MI: [['48000', '49999']],
  MN: [['55000', '56799']],
  MS: [['38600', '39799']],
  MO: [['63000', '65899']],
  MT: [['59000', '59999']],
  NE: [['68000', '69399']],
  NV: [['88900', '89899']],
  NH: [['03000', '03899']],
  NJ: [['07000', '08999']],
  NM: [['87000', '88499']],
  NY: [['00500', '00599'], ['06390', '06390'], ['10000', '14999']],
  NC: [['27000', '28999']],
  ND: [['58000', '58899']],
  OH: [['43000', '45999']],
  OK: [['73000', '74999']],
  OR: [['97000', '97999']],
  PA: [['15000', '19699']],
  RI: [['02800', '02999']],
  SC: [['29000', '29999']],
  SD: [['57000', '57799']],
  TN: [['37000', '38599']],
  TX: [['75000', '79999'], ['88500', '88599']],
  UT: [['84000', '84799']],
  VT: [['05000', '05999']],
  VA: [['22000', '24699']],
  WA: [['98000', '99499']],
  WV: [['24700', '26899']],
  WI: [['53000', '54999']],
  WY: [['82000', '83199']],
  PR: [['00600', '00799'], ['00900', '00988']],
  VI: [['00800', '00851']],
  GU: [['96910', '96932']],
  AS: [['96799', '96799']],
  MP: [['96950', '96952']],
}

export interface ZipRange {
  /** ZIP de 5 dígitos donde inicia el bloque. */
  start: string
  /** ZIP de 5 dígitos donde termina el bloque. */
  end: string
  /** Etiqueta de prefijos de 3 dígitos, p.ej. "320–349" o "850". */
  prefixLabel: string
}

/** Rangos ZIP de un estado (por su abreviatura), listos para mostrar. */
export function zipRangesFor(abbr: string): ZipRange[] {
  const ranges = STATE_ZIP_RANGES[abbr] ?? []
  return ranges.map(([start, end]) => {
    const p1 = start.slice(0, 3)
    const p2 = end.slice(0, 3)
    return { start, end, prefixLabel: p1 === p2 ? p1 : `${p1}–${p2}` }
  })
}

/** ¿El estado tiene rangos ZIP definidos? */
export function hasZipRanges(abbr: string): boolean {
  return (STATE_ZIP_RANGES[abbr]?.length ?? 0) > 0
}

/**
 * ¿Un ZIP o prefijo (2–5 dígitos) cae dentro de algún rango del estado?
 * Permite buscar el estado escribiendo un código postal parcial o completo.
 */
export function stateMatchesZip(abbr: string, zipQuery: string): boolean {
  const digits = zipQuery.replace(/\D/g, '')
  if (digits.length < 2) return false
  const ranges = STATE_ZIP_RANGES[abbr] ?? []
  // Compara el prefijo del query contra los prefijos de inicio/fin de cada rango.
  const q = Number(digits.padEnd(5, '0').slice(0, 5))
  const qEnd = Number(digits.padEnd(5, '9').slice(0, 5))
  return ranges.some(([start, end]) => {
    const s = Number(start)
    const e = Number(end)
    // Solapamiento entre [q, qEnd] (posibles ZIP que empiezan con el prefijo) y [s, e]
    return q <= e && qEnd >= s
  })
}
