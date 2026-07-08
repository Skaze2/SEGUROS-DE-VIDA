import { parseMoney } from '@/lib/money'

export const DEDUCTIBLE_MIN = 4000
export const DEDUCTIBLE_MAX = 8000
/** Desde este valor el deducible corresponde a un caso CON hogar fiscal. */
export const FISCAL_HOME_THRESHOLD = 6000

export type DeductibleEvaluation =
  | { status: 'empty' }
  | { status: 'invalid'; message: string }
  | { status: 'sin-hogar'; value: number; message: string }
  | { status: 'con-hogar'; value: number; message: string }

export function evaluateDeductible(raw: string): DeductibleEvaluation {
  if (raw.trim() === '') {
    return { status: 'empty' }
  }

  const value = parseMoney(raw)
  if (Number.isNaN(value) || value < DEDUCTIBLE_MIN || value > DEDUCTIBLE_MAX) {
    return {
      status: 'invalid',
      message: 'El deducible debe estar entre $4,000 y $8,000.',
    }
  }

  if (value < FISCAL_HOME_THRESHOLD) {
    return {
      status: 'sin-hogar',
      value,
      message:
        'Has ingresado un valor dirigido a los deducibles de una persona SIN hogar fiscal.',
    }
  }

  return {
    status: 'con-hogar',
    value,
    message: 'El valor ingresado corresponde al que se agregaría si existiese un hogar fiscal.',
  }
}

export function isValidDeductible(
  evaluation: DeductibleEvaluation,
): evaluation is Extract<DeductibleEvaluation, { value: number }> {
  return evaluation.status === 'sin-hogar' || evaluation.status === 'con-hogar'
}
