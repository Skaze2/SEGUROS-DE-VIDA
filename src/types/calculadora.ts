import type { Timestamp } from 'firebase/firestore'

export type ContractType = 'W2' | '1099'

/** Modo de estimación del ingreso anual del cotizante. */
export type IncomeMode = 'estandar' | 'variable'

/** Método de captura de un periodo en la estimación variable. */
export type PeriodMethod = 'fijo' | 'semanal' | 'hora'

export interface IncomePeriod {
  id: string
  /** Mes inicial 0–11 (Enero = 0). */
  startMonth: number
  /** Mes final 0–11 (inclusive). */
  endMonth: number
  method: PeriodMethod
  /** Valor principal: fijo = total del periodo · semanal = tarifa semanal · hora = tarifa por hora. */
  value: number
  /** Horas por semana (solo método 'hora'; por defecto 40). Siempre numérico para Firestore. */
  hoursPerWeek: number
  /** Ingreso calculado del periodo (denormalizado para historial/visualización). */
  income: number
}

export interface Member {
  id: string
  name: string
  contractType: ContractType
  /** Modo estándar: ingreso semanal. Modo variable: promedio (anual/52). */
  weeklyIncome: number
  /** Modo estándar: weeklyIncome × 52. Modo variable: suma de periodos. */
  annualIncome: number
  /** Solo contratos 1099 (4000–8000). En W-2 la clave se omite por completo. */
  deductible?: number
  /** 1099: annualIncome − deductible · W-2: annualIncome */
  netIncome: number
  /** 'variable' cuando el ingreso se estimó por periodos. Ausente = estándar (compat. hacia atrás). */
  incomeMode?: IncomeMode
  /** Periodos de la estimación variable (solo cuando incomeMode === 'variable'). */
  periods?: IncomePeriod[]
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
