import { round2 } from '@/lib/money'
import type { Contrato, EstatusMigratorio, Miembro, Rol } from '@/features/escenarios/escenariosData'
import type { Escenario } from '@/features/escenarios/escenariosData'

export interface MiembroEditable extends Miembro {
  id: string
  /** Ingreso bruto SEMANAL manifestado (lo que gana por semana). anual = semanal × 52. */
  ingreso_semanal: number
}

export interface HogarState {
  escenarioId: string | null
  titulo: string
  estado: string
  codigoPostal: string
  ciudad: string
  expansionMedicaid: boolean
  tieneMedicareMedicaid: boolean
  miembros: MiembroEditable[]
}

let seq = 0
function nextId() {
  seq += 1
  return `m-${seq}`
}

export function nuevoMiembro(rol: Rol = 'dependiente'): MiembroEditable {
  const trabaja = rol !== 'dependiente'
  return {
    id: nextId(),
    rol,
    edad: rol === 'dependiente' ? 10 : 35,
    declara_taxes: rol !== 'dependiente',
    tipo_contrato: trabaja ? 'W2' : null,
    ingreso_semanal: 0,
    ingreso_anual: 0,
    estatus_migratorio: 'resuelto',
    puede_inscribirse_marketplace: true,
  }
}

export function escenarioAHogar(esc: Escenario): HogarState {
  return {
    escenarioId: esc.id,
    titulo: esc.titulo,
    estado: esc.estado,
    codigoPostal: esc.codigo_postal,
    ciudad: esc.ciudad,
    expansionMedicaid: esc.estado_expansion_medicaid,
    tieneMedicareMedicaid: esc.tiene_medicare_medicaid === 'SI',
    // El anual del escenario se conserva EXACTO; el semanal se deriva solo para mostrar/editar.
    miembros: esc.miembros.map((m) => ({
      ...m,
      id: nextId(),
      ingreso_semanal: round2(m.ingreso_anual / 52),
    })),
  }
}

export const hogarInicial: HogarState = {
  escenarioId: null,
  titulo: 'Hogar personalizado',
  estado: '',
  codigoPostal: '',
  ciudad: '',
  expansionMedicaid: false,
  tieneMedicareMedicaid: false,
  miembros: [nuevoMiembro('titular')],
}

/** Ingreso anual mostrado para un miembro (deriva del anual canónico). */
export function ingresoAnualMiembro(m: MiembroEditable): number {
  return m.tipo_contrato !== null ? m.ingreso_anual : 0
}

export type HogarAction =
  | { type: 'LOAD_SCENARIO'; escenario: Escenario }
  | { type: 'SET_CAMPO'; campo: 'estado' | 'codigoPostal' | 'ciudad' | 'titulo'; valor: string }
  | { type: 'TOGGLE_EXPANSION' }
  | { type: 'TOGGLE_MEDICARE' }
  | { type: 'ADD_MIEMBRO' }
  | { type: 'REMOVE_MIEMBRO'; id: string }
  | { type: 'UPDATE_MIEMBRO'; id: string; patch: Partial<MiembroEditable> }
  | { type: 'RESET' }

/** Mantiene coherentes los campos derivados de un miembro al editarlo. */
function normalizarMiembro(m: MiembroEditable): MiembroEditable {
  const contrato: Contrato = m.tipo_contrato
  const trabaja = contrato !== null
  return {
    ...m,
    // Si no trabaja, no hay ingreso (ni semanal ni anual).
    ingreso_semanal: trabaja ? m.ingreso_semanal : 0,
    ingreso_anual: trabaja ? m.ingreso_anual : 0,
    // El poder inscribirse deriva del estatus migratorio.
    puede_inscribirse_marketplace: m.estatus_migratorio === 'resuelto',
  }
}

export function hogarReducer(state: HogarState, action: HogarAction): HogarState {
  switch (action.type) {
    case 'LOAD_SCENARIO':
      return escenarioAHogar(action.escenario)
    case 'SET_CAMPO':
      return { ...state, [action.campo]: action.valor, escenarioId: null }
    case 'TOGGLE_EXPANSION':
      return { ...state, expansionMedicaid: !state.expansionMedicaid, escenarioId: null }
    case 'TOGGLE_MEDICARE':
      return { ...state, tieneMedicareMedicaid: !state.tieneMedicareMedicaid, escenarioId: null }
    case 'ADD_MIEMBRO':
      return { ...state, miembros: [...state.miembros, nuevoMiembro()], escenarioId: null }
    case 'REMOVE_MIEMBRO':
      return {
        ...state,
        miembros: state.miembros.filter((m) => m.id !== action.id),
        escenarioId: null,
      }
    case 'UPDATE_MIEMBRO':
      return {
        ...state,
        escenarioId: null,
        miembros: state.miembros.map((m) => {
          if (m.id !== action.id) return m
          const merged = { ...m, ...action.patch }
          // Si se editó el ingreso SEMANAL, el anual se recalcula (× 52), como en la Calculadora.
          if (action.patch.ingreso_semanal !== undefined) {
            merged.ingreso_anual = round2(action.patch.ingreso_semanal * 52)
          }
          return normalizarMiembro(merged)
        }),
      }
    case 'RESET':
      return { ...hogarInicial, miembros: [nuevoMiembro('titular')] }
  }
}

export const ROLES: { value: Rol; label: string }[] = [
  { value: 'titular', label: 'Titular' },
  { value: 'conyuge', label: 'Cónyuge' },
  { value: 'dependiente', label: 'Dependiente' },
]

export const CONTRATOS: { value: Contrato; label: string }[] = [
  { value: 'W2', label: 'W-2' },
  { value: '1099', label: '1099' },
  { value: null, label: 'No trabaja' },
]

export const ESTATUS: { value: EstatusMigratorio; label: string }[] = [
  { value: 'resuelto', label: 'Resuelto' },
  { value: 'no_resuelto', label: 'No resuelto' },
]
