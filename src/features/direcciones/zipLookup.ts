/**
 * Consulta de un código postal (ZIP) de EE. UU. → estado + lugar.
 * Fuente: API pública zippopotam.us (gratuita, HTTPS, CORS habilitado).
 * Consulta solo el ZIP solicitado (no descarga toda la base).
 */

export interface ZipPlace {
  placeName: string
  state: string
  stateAbbr: string
  latitude: string
  longitude: string
}

export interface ZipLookupResult {
  zip: string
  places: ZipPlace[]
}

interface ZippopotamResponse {
  'post code'?: string
  places?: Array<{
    'place name'?: string
    state?: string
    'state abbreviation'?: string
    latitude?: string
    longitude?: string
  }>
}

/** Normaliza a 5 dígitos; devuelve '' si no hay 5 dígitos válidos. */
export function normalizeZip(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  return digits.length === 5 ? digits : ''
}

export async function lookupZip(rawZip: string, signal?: AbortSignal): Promise<ZipLookupResult> {
  const zip = normalizeZip(rawZip)
  if (!zip) {
    throw new Error('Ingresa un código postal de 5 dígitos.')
  }

  let res: Response
  try {
    res = await fetch(`https://api.zippopotam.us/us/${zip}`, { signal })
  } catch {
    throw new Error('No se pudo conectar. Revisa tu conexión a internet.')
  }

  if (res.status === 404) {
    throw new Error(`No se encontró el ZIP ${zip} en EE. UU.`)
  }
  if (!res.ok) {
    throw new Error('No se pudo consultar el código postal. Intenta de nuevo.')
  }

  const data = (await res.json()) as ZippopotamResponse
  const places = (data.places ?? []).map((p) => ({
    placeName: p['place name'] ?? '—',
    state: p.state ?? '—',
    stateAbbr: p['state abbreviation'] ?? '',
    latitude: p.latitude ?? '',
    longitude: p.longitude ?? '',
  }))

  if (places.length === 0) {
    throw new Error(`No se encontró el ZIP ${zip} en EE. UU.`)
  }

  return { zip: data['post code'] ?? zip, places }
}
