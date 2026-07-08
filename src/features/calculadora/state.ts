import type { Member } from '@/types/calculadora'

export interface SessionState {
  /** null = cálculo nuevo · string = editando un cálculo del historial */
  editingCalcId: string | null
  title: string
  members: Member[]
  householdSize: number
}

export const initialSession: SessionState = {
  editingCalcId: null,
  title: '',
  members: [],
  householdSize: 1,
}

export type SessionAction =
  | { type: 'ADD_MEMBER'; member: Member }
  | { type: 'REMOVE_MEMBER'; id: string }
  | { type: 'SET_HOUSEHOLD_SIZE'; size: number }
  | { type: 'SET_TITLE'; title: string }
  | {
      type: 'LOAD_CALCULATION'
      calcId: string
      title: string
      members: Member[]
      householdSize: number
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
    case 'LOAD_CALCULATION':
      return {
        editingCalcId: action.calcId,
        title: action.title,
        members: action.members,
        householdSize: action.householdSize,
      }
    case 'RESET_SESSION':
      return initialSession
  }
}
