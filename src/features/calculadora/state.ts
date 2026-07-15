import type { Member } from '@/types/calculadora'

export interface SessionState {
  /** null = cálculo nuevo · string = editando un cálculo del historial */
  editingCalcId: string | null
  title: string
  members: Member[]
  householdSize: number
  /** Estado del hogar (abreviatura). null = tabla federal 48 estados + DC. */
  stateAbbr: string | null
}

export const initialSession: SessionState = {
  editingCalcId: null,
  title: '',
  members: [],
  householdSize: 1,
  stateAbbr: null,
}

export type SessionAction =
  | { type: 'ADD_MEMBER'; member: Member }
  | { type: 'REMOVE_MEMBER'; id: string }
  | { type: 'SET_HOUSEHOLD_SIZE'; size: number }
  | { type: 'SET_TITLE'; title: string }
  | { type: 'SET_STATE'; abbr: string | null }
  | {
      type: 'LOAD_CALCULATION'
      calcId: string
      title: string
      members: Member[]
      householdSize: number
      stateAbbr: string | null
    }
  | { type: 'RESET_SESSION' }

export function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'ADD_MEMBER':
      return { ...state, members: [...state.members, action.member] }
    case 'REMOVE_MEMBER':
      return { ...state, members: state.members.filter((m) => m.id !== action.id) }
    case 'SET_HOUSEHOLD_SIZE':
      return { ...state, householdSize: Math.max(1, Math.round(action.size)) }
    case 'SET_TITLE':
      return { ...state, title: action.title }
    case 'SET_STATE':
      return { ...state, stateAbbr: action.abbr }
    case 'LOAD_CALCULATION':
      return {
        editingCalcId: action.calcId,
        title: action.title,
        members: action.members,
        householdSize: action.householdSize,
        stateAbbr: action.stateAbbr,
      }
    case 'RESET_SESSION':
      return initialSession
  }
}
