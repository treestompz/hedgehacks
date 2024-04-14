import { LINKDBLinkSpecialType } from '../linkdb/linkdb-manager'

export const buildGTrendPageLink = (
  terms: string[],
  locations: string[],
  timeRanges: string[],
  specialType: LINKDBLinkSpecialType
): string => {
  if (specialType === 'yearoverlap') {
    return yearOverYear(terms, locations, timeRanges)
  }

  if (terms.length === 0) return ''

  let params = new URLSearchParams()

  params.set('q', terms.join(','))

  if (locations.length > 0) {
    if (locations[0] === 'US') {
      params.set('geo', 'US')
    }
  } else {
    params.set('geo', 'Worldwide')
  }

  // timeRange
  if (timeRanges.length > 0) {
    params.set('date', timeRanges[0])
  }

  return `https://trends.google.com/trends/explore?${params.toString()}`
}

const yearOverYear = (
  terms: string[],
  locations: string[],
  timeRanges: string[]
) => {
  if (terms.length === 0) return ''

  let params = new URLSearchParams()

  params.set('q', terms.join(','))
  let l = []
  for (let i = 0; i < locations.length; i++) {
    if (locations[i].toLowerCase() === 'worldwide') {
      l.push('')
    } else {
      l.push(locations[i])
    }
  }
  params.set('geo', l.join(','))
  params.set('date', timeRanges.join(','))

  return `https://trends.google.com/trends/explore?${params.toString()}`
}
