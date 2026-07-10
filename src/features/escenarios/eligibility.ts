import { fplPercent, fplThreshold } from '@/lib/fpl'
import type { Elegibilidad, Miembro } from '@/features/escenarios/escenariosData'

/** Entrada del motor: un hogar fiscal editable. */
export interface Hogar {
  estado: string
  codigoPostal: string
  ciudad: string
  expansionMedicaid: boolean
  tieneMedicareMedicaid: boolean
  miembros: Miembro[]
}

export type Banda =
  | 'medicare_medicaid'
  | 'sobre_400'
  | 'subsidio'
  | 'bajo_138_expansion'
  | 'bajo_138_sin_expansion'
  | 'bajo_100_expansion'
  | 'brecha'

export interface ResultadoElegibilidad {
  tamanoHogar: number
  ingresoHogar: number
  fpl100: number
  porcentajeFpl: number
  banda: Banda
  categoria: string
  elegibilidad: Elegibilidad
  estatusMixto: boolean
  /** Miembros que SÍ pueden inscribirse (estatus resuelto). */
  miembrosInscribibles: number
  /** Miembros que NO pueden inscribirse por estatus no resuelto. */
  miembrosNoInscribibles: number
}

/** Ingreso del hogar fiscal: suma del ingreso de los miembros que declaran (o suman) en la declaración. */
export function ingresoHogar(miembros: Miembro[]): number {
  return miembros.reduce((sum, m) => sum + (m.declara_taxes ? m.ingreso_anual : 0), 0)
}

/** Un miembro puede inscribirse en el Marketplace si su estatus migratorio está resuelto. */
export function puedeInscribirse(miembro: Miembro): boolean {
  return miembro.estatus_migratorio === 'resuelto'
}

/**
 * Evalúa la elegibilidad al subsidio del Mercado (ACA) para un hogar.
 * Reproduce las reglas referenciales del set de escenarios (FPL federal HHS 2025).
 */
export function evaluarHogar(hogar: Hogar): ResultadoElegibilidad {
  const miembros = hogar.miembros
  const tamanoHogar = Math.max(1, miembros.length)
  const ingreso = ingresoHogar(miembros)
  const fpl100 = fplThreshold(tamanoHogar)
  // Ratio EXACTO para decidir la banda (evita que un 137.98% redondeado a 138.0
  // cruce el umbral y confunda Medicaid con subsidio). El % redondeado es solo para mostrar.
  const ratio = fpl100 > 0 ? ingreso / fpl100 : 0
  const porcentajeFpl = fplPercent(ingreso, tamanoHogar)

  const miembrosInscribibles = miembros.filter(puedeInscribirse).length
  const miembrosNoInscribibles = miembros.length - miembrosInscribibles
  const estatusMixto = miembrosNoInscribibles > 0 && miembrosInscribibles > 0
  const nadieInscribible = miembros.length > 0 && miembrosInscribibles === 0

  let banda: Banda
  let categoria: string
  let elegibilidad: Elegibilidad

  if (hogar.tieneMedicareMedicaid) {
    banda = 'medicare_medicaid'
    categoria = 'No elegible a subsidio del Mercado (ya tiene Medicare/Medicaid)'
    elegibilidad = 'NO'
  } else if (ratio > 4.0) {
    banda = 'sobre_400'
    categoria = 'Sin subsidio (>400% FPL en 2026)'
    elegibilidad = 'NO'
  } else if (ratio >= 1.38) {
    banda = 'subsidio'
    categoria = 'Subsidio ACA (138%–400%)'
    elegibilidad = 'SI'
  } else if (ratio >= 1.0) {
    // Zona 100%–138%
    if (hogar.expansionMedicaid) {
      banda = 'bajo_138_expansion'
      categoria = 'Zona <138%: Medicaid probable (estado con expansión)'
      elegibilidad = 'NO'
    } else {
      banda = 'bajo_138_sin_expansion'
      categoria =
        'Zona <138% (sin expansión): adultos → subsidio ACA; menores → Medicaid/CHIP'
      elegibilidad = 'SI'
    }
  } else {
    // <100% FPL
    if (hogar.expansionMedicaid) {
      banda = 'bajo_100_expansion'
      categoria = 'Medicaid probable (<100% FPL, estado con expansión)'
      elegibilidad = 'NO'
    } else {
      banda = 'brecha'
      categoria = 'Brecha de cobertura (<100% FPL, estado sin expansión)'
      elegibilidad = 'NO'
    }
  }

  // Ajuste por estatus migratorio mixto: si el hogar era elegible pero hay miembros
  // sin estatus resuelto, la elegibilidad pasa a PARCIAL (unos solicitan, otros no).
  if (elegibilidad === 'SI') {
    if (nadieInscribible) {
      elegibilidad = 'NO'
      categoria = 'Ningún miembro puede inscribirse (estatus no resuelto)'
    } else if (estatusMixto) {
      elegibilidad = 'PARCIAL'
      categoria += ' — hogar de estatus mixto'
    }
  }

  return {
    tamanoHogar,
    ingresoHogar: ingreso,
    fpl100,
    porcentajeFpl,
    banda,
    categoria,
    elegibilidad,
    estatusMixto,
    miembrosInscribibles,
    miembrosNoInscribibles,
  }
}

/** Estilo visual (theme-aware) por resultado de elegibilidad. */
export function estiloElegibilidad(elegibilidad: Elegibilidad): {
  label: string
  text: string
  bg: string
  border: string
  dot: string
} {
  switch (elegibilidad) {
    case 'SI':
      return {
        label: 'Elegible',
        text: 'text-neon-cyan',
        bg: 'bg-neon-cyan/10',
        border: 'border-neon-cyan/30',
        dot: '#2dd4bf',
      }
    case 'PARCIAL':
      return {
        label: 'Parcial',
        text: 'text-neon-orange',
        bg: 'bg-neon-orange/10',
        border: 'border-neon-orange/30',
        dot: '#fb923c',
      }
    case 'NO':
      return {
        label: 'No elegible',
        text: 'text-neon-coral',
        bg: 'bg-neon-coral/10',
        border: 'border-neon-coral/30',
        dot: '#f43f5e',
      }
  }
}
