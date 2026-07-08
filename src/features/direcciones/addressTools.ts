import {
  DIRECTIONAL_ABBREVIATIONS,
  SECONDARY_UNIT_ABBREVIATIONS,
  STATE_ABBREVIATIONS,
  STREET_SUFFIXES,
  type AddressEntry,
} from '@/features/direcciones/addressData'

export interface AddressFinding {
  type: 'ok' | 'warning' | 'fix'
  title: string
  detail: string
}

export interface AddressAnalysis {
  original: string
  suggested: string
  findings: AddressFinding[]
  matches: AddressEntry[]
}

const ZIP_RE = /^\d{5}(?:-\d{4})?$/
const HOUSE_NUMBER_RE = /^\d+[A-Z0-9/-]*$/i
const TOKEN_RE = /#[A-Z0-9-]+|[A-Z0-9]+(?:-[A-Z0-9]+)?/gi

const allCatalogs = [
  ...STATE_ABBREVIATIONS,
  ...STREET_SUFFIXES,
  ...SECONDARY_UNIT_ABBREVIATIONS,
  ...DIRECTIONAL_ABBREVIATIONS,
]

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9# -]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase()
}

function index(entries: AddressEntry[]) {
  const map = new Map<string, AddressEntry>()
  for (const entry of entries) {
    map.set(normalize(entry.label), entry)
    map.set(normalize(entry.abbr), entry)
    for (const alias of entry.aliases ?? []) {
      map.set(normalize(alias), entry)
    }
  }
  return map
}

const stateMap = index(STATE_ABBREVIATIONS)
const suffixMap = index(STREET_SUFFIXES)
const unitMap = index(SECONDARY_UNIT_ABBREVIATIONS)
const directionalMap = index(DIRECTIONAL_ABBREVIATIONS)

function tokenize(value: string) {
  return Array.from(normalize(value).matchAll(TOKEN_RE), (match) => match[0])
}

function findMultiWordToken(
  tokens: string[],
  start: number,
  map: Map<string, AddressEntry>,
  maxWords = 3,
) {
  for (let size = Math.min(maxWords, tokens.length - start); size > 0; size -= 1) {
    const phrase = tokens.slice(start, start + size).join(' ')
    const entry = map.get(phrase)
    if (entry) return { entry, size }
  }
  return null
}

export function searchAddressCatalog(query: string) {
  const cleanQuery = normalize(query)
  if (!cleanQuery) return allCatalogs.slice(0, 12)

  return allCatalogs
    .filter((entry) => {
      const searchable = normalize([entry.label, entry.abbr, ...(entry.aliases ?? [])].join(' '))
      return searchable.includes(cleanQuery)
    })
    .slice(0, 18)
}

export function analyzeAddress(rawAddress: string): AddressAnalysis {
  const original = rawAddress.trim()
  const tokens = tokenize(original)
  const findings: AddressFinding[] = []

  if (tokens.length === 0) {
    return {
      original,
      suggested: '',
      findings: [
        {
          type: 'warning',
          title: 'Escribe una direccion',
          detail: 'Formato base recomendado: numero de casa, calle, ciudad, estado y ZIP.',
        },
      ],
      matches: [],
    }
  }

  const zipIndexes = tokens
    .map((token, index) => (ZIP_RE.test(token) ? index : -1))
    .filter((index) => index >= 0)
  const zip = zipIndexes.length > 0 ? tokens[zipIndexes[0]] : ''
  const withoutZip = tokens.filter((_, index) => !zipIndexes.includes(index))

  if (zipIndexes.length > 0 && zipIndexes[0] === 0) {
    findings.push({
      type: 'fix',
      title: 'ZIP al final',
      detail: 'En el formato postal de USA el codigo ZIP normalmente va despues de ciudad y estado.',
    })
  }

  const firstHouseIndex = withoutZip.findIndex((token) => HOUSE_NUMBER_RE.test(token))
  let houseNumber = ''
  let body = withoutZip
  if (firstHouseIndex > 0 || firstHouseIndex === withoutZip.length - 1) {
    houseNumber = withoutZip[firstHouseIndex]
    body = withoutZip.filter((_, index) => index !== firstHouseIndex)
    findings.push({
      type: 'fix',
      title: 'Numero de casa primero',
      detail: `Movi ${houseNumber} al inicio porque la direccion debe iniciar con el numero civico.`,
    })
  } else if (firstHouseIndex === 0) {
    houseNumber = withoutZip[0]
    body = withoutZip.slice(1)
    findings.push({
      type: 'ok',
      title: 'Orden inicial correcto',
      detail: 'La direccion inicia con numero de casa.',
    })
  } else {
    findings.push({
      type: 'warning',
      title: 'Falta numero de casa',
      detail: 'Agrega el numero civico antes del nombre de la calle cuando aplique.',
    })
  }

  const output: string[] = []
  const matches: AddressEntry[] = []

  for (let index = 0; index < body.length; index += 1) {
    const stateMatch = findMultiWordToken(body, index, stateMap, 3)
    if (stateMatch) {
      output.push(stateMatch.entry.abbr)
      matches.push(stateMatch.entry)
      index += stateMatch.size - 1
      continue
    }

    const directionalMatch = findMultiWordToken(body, index, directionalMap, 2)
    if (directionalMatch) {
      output.push(directionalMatch.entry.abbr)
      matches.push(directionalMatch.entry)
      index += directionalMatch.size - 1
      continue
    }

    const suffixMatch = findMultiWordToken(body, index, suffixMap, 1)
    if (suffixMatch) {
      output.push(suffixMatch.entry.abbr)
      matches.push(suffixMatch.entry)
      if (body[index] !== suffixMatch.entry.abbr) {
        findings.push({
          type: 'fix',
          title: `${body[index]} -> ${suffixMatch.entry.abbr}`,
          detail: `Use ${suffixMatch.entry.abbr} para ${suffixMatch.entry.label}.`,
        })
      }
      continue
    }

    const unitMatch = findMultiWordToken(body, index, unitMap, 1)
    if (unitMatch) {
      output.push(unitMatch.entry.abbr)
      matches.push(unitMatch.entry)
      continue
    }

    output.push(body[index])
  }

  if (!zip) {
    findings.push({
      type: 'warning',
      title: 'Falta ZIP',
      detail: 'Para una direccion completa agrega codigo postal de 5 digitos o ZIP+4.',
    })
  }

  if (matches.length === 0) {
    findings.push({
      type: 'warning',
      title: 'Sin abreviaturas detectadas',
      detail: 'Escribe palabras como Street, Avenue, North, Florida o Apartment para normalizarlas.',
    })
  }

  const suggested = [houseNumber, ...output, zip].filter(Boolean).join(' ')

  return {
    original,
    suggested,
    findings,
    matches: matches.filter(
      (entry, index, list) => list.findIndex((item) => item.abbr === entry.abbr) === index,
    ),
  }
}

export function normalizeStreetLine(rawStreet: string) {
  const tokens = tokenize(rawStreet)
  const output: string[] = []

  for (let index = 0; index < tokens.length; index += 1) {
    const directionalMatch = findMultiWordToken(tokens, index, directionalMap, 2)
    if (directionalMatch) {
      output.push(directionalMatch.entry.abbr)
      index += directionalMatch.size - 1
      continue
    }

    const suffixMatch = findMultiWordToken(tokens, index, suffixMap, 1)
    if (suffixMatch) {
      output.push(suffixMatch.entry.abbr)
      continue
    }

    output.push(tokens[index])
  }

  return output.join(' ')
}

export function getCategoryResults(query: string, entries: AddressEntry[]) {
  const cleanQuery = normalize(query)
  if (!cleanQuery) return entries

  return entries
    .filter((entry) =>
      normalize([entry.label, entry.abbr, ...(entry.aliases ?? [])].join(' ')).includes(cleanQuery),
    )
}
