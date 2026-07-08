const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

const usdWhole = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const dateEs = new Intl.DateTimeFormat('es', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

export function formatUSD(value: number): string {
  return usd.format(value)
}

/** Sin decimales — para count-ups y totales grandes. */
export function formatUSDWhole(value: number): string {
  return usdWhole.format(value)
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

export function formatDate(date: Date): string {
  return dateEs.format(date)
}

export function round2(value: number): number {
  return Math.round(value * 100) / 100
}

/**
 * Convierte texto de un input de dinero a número.
 * Acepta formato en-US ("1,200.50") y español ("1.200,50"); un solo separador
 * seguido de exactamente 3 dígitos se interpreta como separador de miles
 * ("1.200" → 1200, "1,200" → 1200). Formatos ambiguos o basura → NaN.
 */
export function parseMoney(raw: string): number {
  let s = raw.replace(/[$\s]/g, '')
  if (s === '' || !/^\d[\d.,]*$/.test(s)) return NaN

  const lastDot = s.lastIndexOf('.')
  const lastComma = s.lastIndexOf(',')

  if (lastDot !== -1 && lastComma !== -1) {
    // Ambos separadores: el último es el decimal
    if (lastDot > lastComma) {
      s = s.replace(/,/g, '') // 1,234.56
    } else {
      s = s.replace(/\./g, '').replace(',', '.') // 1.234,56
    }
  } else if (lastComma !== -1) {
    const parts = s.split(',')
    if (parts.length === 2 && parts[1].length !== 3) {
      s = s.replace(',', '.') // 1,5 → decimal español
    } else if (parts.slice(1).every((p) => p.length === 3)) {
      s = s.replace(/,/g, '') // 1,200 / 1,200,300 → miles
    } else {
      return NaN // 1,2,3
    }
  } else if (lastDot !== -1) {
    const parts = s.split('.')
    if (parts.length === 2 && parts[1].length !== 3) {
      // 1.5 → decimal en-US, se deja igual
    } else if (parts.slice(1).every((p) => p.length === 3)) {
      s = s.replace(/\./g, '') // 1.200 / 1.200.300 → miles español
    } else {
      return NaN
    }
  }

  const value = Number(s)
  return Number.isFinite(value) ? value : NaN
}
