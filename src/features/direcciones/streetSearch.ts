import { normalizeStreetLine } from '@/features/direcciones/addressTools'

export interface StreetSearchResult {
  id: number
  osmType: string
  name: string
  highway: string
  normalizedName: string
}

interface OverpassElement {
  id: number
  type: string
  tags?: {
    name?: string
    highway?: string
  }
}

interface OverpassResponse {
  elements?: OverpassElement[]
}

const OVERPASS_ENDPOINT = 'https://overpass-api.de/api/interpreter'

function escapeOverpassString(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export async function searchExistingStreets(city: string, stateAbbr: string, streetTerm: string) {
  const cleanCity = city.trim()
  const cleanState = stateAbbr.trim().toUpperCase()
  const cleanStreet = streetTerm.trim()

  if (cleanCity.length < 2 || cleanState.length !== 2 || cleanStreet.length < 3) {
    throw new Error('Escribe ciudad, estado y minimo 3 letras de la calle.')
  }

  const query = `
    [out:json][timeout:20];
    area["ISO3166-2"="US-${escapeOverpassString(cleanState)}"]["admin_level"="4"]->.state;
    area["boundary"="administrative"]["name"="${escapeOverpassString(cleanCity)}"](area.state)->.city;
    (
      way["highway"]["name"~"${escapeRegex(cleanStreet)}",i](area.city);
    );
    out tags center 50;
  `

  const response = await fetch(OVERPASS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: new URLSearchParams({ data: query }),
  })

  if (!response.ok) {
    throw new Error('No se pudo consultar la base de calles en este momento.')
  }

  const data = (await response.json()) as OverpassResponse
  const unique = new Map<string, StreetSearchResult>()

  for (const element of data.elements ?? []) {
    const name = element.tags?.name?.trim()
    if (!name) continue
    const key = name.toUpperCase()
    if (unique.has(key)) continue
    unique.set(key, {
      id: element.id,
      osmType: element.type,
      name,
      highway: element.tags?.highway ?? 'road',
      normalizedName: normalizeStreetLine(name),
    })
  }

  return Array.from(unique.values()).sort((a, b) => a.name.localeCompare(b.name)).slice(0, 30)
}
