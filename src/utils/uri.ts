export interface LocationNormalized {
  path: string
  fullPath: string
  hash: string
  query: Recordable
}

export interface LocationPartial {
  path: string
  query?: Recordable
  hash?: string
}

export const PLUS_RE = /\+/g // %2B

/**
 * Transforms a queryString into a object. Accept both, a
 * version with the leading `?` and without Should work as URLSearchParams
 *
 * @param search - search string to parse
 * @returns a query object
 */
export function parseQuery(search: string): Recordable {
  const query: Recordable = {}
  // avoid creating an object with an empty key and empty value
  // because of split('&')
  if (search === '' || search === '?')
    return query
  const hasLeadingIM = search[0] === '?'
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&')
  for (let i = 0; i < searchParams.length; ++i) {
    // pre decode the + into space
    const searchParam = searchParams[i].replace(PLUS_RE, ' ')
    // allow the = character
    const eqPos = searchParam.indexOf('=')
    const key = decodeURIComponent(`${eqPos < 0 ? searchParam : searchParam.slice(0, eqPos)}`)
    const value = eqPos < 0 ? null : decodeURIComponent(`${searchParam.slice(eqPos + 1)}`)

    if (key in query) {
      // an extra variable for ts types
      let currentValue = query[key]
      if (!Array.isArray(currentValue)) {
        currentValue = query[key] = [currentValue]
      }
      // we force the modification
      ;(currentValue as unknown[]).push(value)
    }
    else {
      query[key] = value
    }
  }
  return query
}

/**
 * Transforms a URI into a normalized history location
 *
 * @param location - URI to normalize
 * @param currentLocation - current absolute location. Allows resolving relative paths. If provided, it must start with `/`.
 * @returns a normalized history location
 */
export function parseURL(location: string, currentLocation?: string): LocationNormalized {
  let path: string | undefined
  let query: Recordable = {}
  let searchString = ''
  let hash = ''

  // Could use URL and URLSearchParams but IE 11 doesn't support it
  // TODO: move to new URL()
  const hashPos = location.indexOf('#')
  let searchPos = location.indexOf('?')
  // the hash appears before the search, so it's not part of the search string
  if (hashPos < searchPos && hashPos >= 0) {
    searchPos = -1
  }

  if (searchPos > -1) {
    path = location.slice(0, searchPos)
    searchString = location.slice(searchPos + 1, hashPos > -1 ? hashPos : location.length)

    query = parseQuery(searchString)
  }

  if (hashPos > -1) {
    path = path || location.slice(0, hashPos)
    // keep the # character
    hash = location.slice(hashPos, location.length)
  }

  // no search and no query
  path = resolveRelativePath(path != null ? path : location, currentLocation || '')
  // empty path means a relative query or hash `?foo=f`, `#thing`

  return {
    fullPath: path + (searchString && '?') + searchString + hash,
    path,
    query,
    hash: decodeURIComponent(`${hash}`),
  }
}

/**
 * Resolves a relative path that starts with `.`.
 *
 * @param to - path location we are resolving
 * @param from - currentLocation.path, should start with `/`
 */
export function resolveRelativePath(to: string, from: string): string {
  if (to.startsWith('/') || !from.startsWith('/')) {
    return to
  }

  if (!to)
    return from

  const fromSegments = from.split('/')
  const toSegments = to.split('/')
  const lastToSegment = toSegments[toSegments.length - 1]

  // make . and ./ the same (../ === .., ../../ === ../..)
  // this is the same behavior as new URL()
  if (lastToSegment === '..' || lastToSegment === '.') {
    toSegments.push('')
  }

  let position = fromSegments.length - 1
  let toPosition: number
  let segment: string

  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition]

    // we stay on the same position
    if (segment === '.')
      continue
    // go up in the from array
    if (segment === '..') {
      // we can't go below zero, but we still need to increment toPosition
      if (position > 1)
        position--
      // continue
    }
    // we reached a non-relative path, we stop here
    else {
      break
    }
  }

  return `${fromSegments.slice(0, position).join('/')}/${toSegments.slice(toPosition).join('/')}`
}

/**
 * Stringifies a URL object
 *
 * @param location
 */
export function stringifyURL(location: LocationPartial): string {
  const query: string = location.query ? stringifyQuery(location.query) : ''
  return location.path + (query && '?') + query + (location.hash || '')
}

/**
 * Stringifies a object. Like `URLSearchParams`, it
 * doesn't prepend a `?`
 *
 * @internal
 *
 * @param query - query object to stringify
 * @returns string version of the query without the leading `?`
 */
export function stringifyQuery(query: Recordable): string {
  let search = ''
  for (let key in query) {
    const value = query[key]
    key = encode(key)
    if (value == null) {
      // only null adds the value
      if (value !== undefined) {
        search += (search.length ? '&' : '') + key
      }
      continue
    }
    // keep null values
    const values: unknown[] = Array.isArray(value) ? value.map(v => v && encode(v)) : [value && encode(value)]

    values.forEach((value) => {
      // skip undefined values in arrays as if they were not present
      // smaller code than using filter
      if (value !== undefined) {
        // only append & with non-empty search
        search += (search.length ? '&' : '') + key
        if (value != null) {
          search += `=${value}`
        }
      }
    })
  }

  return search
}

/**
 * Decode text using `decodeURIComponent`. Returns the original text if it
 * fails.
 *
 * @param text - string to decode
 * @returns decoded string
 */
export function decode(text: string | number): string {
  try {
    return decodeURIComponent(`${text}`)
  }
  catch {
    console.warn(`Error decoding "${text}". Using original value`)
  }
  return `${text}`
}

/**
 * Encodes text using `encodeURIComponent`. Returns the original text if it
 * fails.
 *
 * @param text - string to encode
 * @returns encoded string
 */
export function encode(text: string | number): string {
  try {
    return encodeURIComponent(`${text}`)
  }
  catch {
    console.warn(`Error encoding "${text}". Using original value`)
  }
  return `${text}`
}
