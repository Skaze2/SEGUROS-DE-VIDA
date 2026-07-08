import type { Timestamp } from 'firebase/firestore'

export type ContractType = 'W2' | '1099'

export interface Member {
  id: string
  name: string
  contractType: ContractType
  weeklyIncome: number
  /** weeklyIncome × 52 */
  annualIncome: number
  /** Solo contratos 1099 (4000–8000). En W-2 la clave se omite por completo. */
  deductible?: number
  /** 1099: annualIncome − deductible · W-2: annualIncome */
  netIncome: number
}

export interface Calculation {
  id?: string
  title: string
  members: Member[]
  householdSize: number
  totalIncome: number
  fplPercent: number
  fplYear: number
  createdAt: Timestamp | null
  updatedAt: Timestamp | null
}
