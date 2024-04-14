import { buildGTrendPageLink } from '../link-builders/gtrends-link-builder'

export interface LINKDBGroup {
  name: string
  updatedDate: string
  links: LINKDBLink[]
}

export interface UncreatedLINKDBGroup {
  name: string
  updatedDate: string
  links?: LINKDBLink[]
}

export type LINKDBLinkSpecialType = null | 'yearoverlap'

export interface LINKDBLink {
  terms: string[]
  locations: string[]
  timeRanges: string[]
  updatedDate: string
  url: string
  type?: LINKDBLinkSpecialType
}

const HH_GID = '_hh_g_'

class LINKDB {
  isHHGroupKey = (k: string) => {
    return k.startsWith(HH_GID)
  }

  getGid = (g: LINKDBGroup | UncreatedLINKDBGroup) => {
    return HH_GID + g.name.toLowerCase()
  }

  getAllGroups = () => {
    let groups: LINKDBGroup[] = []
    for (var i = 0; i < localStorage.length; i++) {
      let key = <string>localStorage.key(i)

      if (this.isHHGroupKey(key)) {
        let value = <string>localStorage.getItem(key)
        let g: LINKDBGroup = JSON.parse(value)
        groups.push(g)
      }
    }
    return groups
  }

  create = (
    linkDBGroup: LINKDBGroup | UncreatedLINKDBGroup,
    linkDBLink: LINKDBLink
  ) => {
    if (!linkDBGroup.name) {
      console.error('LINKDBGroup.name blank')
      return false
    }

    // use LOWERCASED groupName as unique identifier
    let gid = this.getGid(linkDBGroup)
    let value = localStorage.getItem(gid)

    // create new group if not created
    if (value === null) {
      localStorage.setItem(gid, JSON.stringify({ ...linkDBGroup, links: [] }))
    }

    // group now exists
    let existingGroup: LINKDBGroup = JSON.parse(
      <string>localStorage.getItem(gid)
    )
    // NOTE: should we block if link exists already?
    // add link
    existingGroup.links.push(linkDBLink)
    existingGroup.updatedDate = linkDBGroup.updatedDate

    // save
    localStorage.setItem(gid, JSON.stringify(existingGroup))
    return true
  }

  deleteGroup = (group: LINKDBGroup) => {
    let gid = this.getGid(group)
    let value = localStorage.getItem(gid)
    if (value) {
      localStorage.removeItem(gid)
      return true
    } else {
      return false
    }
  }

  deleteLink = (group: LINKDBGroup, link: LINKDBLink) => {
    let gid = this.getGid(group)
    let existingGroup: LINKDBGroup = JSON.parse(
      <string>localStorage.getItem(gid)
    )

    for (let i = 0; i < existingGroup.links.length; i++) {
      let l = existingGroup.links[i]
      if (l.url === link.url) {
        existingGroup.links.splice(i, 1)
        localStorage.setItem(gid, JSON.stringify(existingGroup))
        return true
      }
    }

    return false
  }

  createWithTermOnly = (term: string) => {
    if (!term) {
      console.error('term empty')
      return false
    }

    let currentDate = new Date().toLocaleString()

    let group: UncreatedLINKDBGroup = {
      name: 'My First Group',
      updatedDate: currentDate,
    }

    let terms = [term]
    let locations = ['US']
    let timeRanges = ['today 5-y']
    let updatedDate = currentDate
    let url = buildGTrendPageLink(terms, locations, timeRanges, null)

    let link: LINKDBLink = {
      terms,
      locations,
      timeRanges,
      updatedDate,
      url,
    }

    this.create(group, link)

    return true
  }

  // NOTE: currently unused
  createNewUserGroups = () => {
    let currentDate = new Date().toLocaleString()

    let drinksGroup: UncreatedLINKDBGroup = {
      name: 'Drinks',
      updatedDate: currentDate,
    }
    let airTravelGroup: UncreatedLINKDBGroup = {
      name: 'Air Travel',
      updatedDate: currentDate,
    }

    let topoChico: LINKDBLink = {
      locations: ['Worldwide'],
      terms: ['topo chico'],
      timeRanges: [''],
      updatedDate: currentDate,
      url: 'https://trends.google.com/trends/explore?q=topo+chico',
    }
    let redBull: LINKDBLink = {
      locations: ['Worldwide'],
      terms: ['red bull'],
      timeRanges: [''],
      updatedDate: currentDate,
      url: 'https://trends.google.com/trends/explore?q=red+bull',
    }

    let flightsToNicaragua: LINKDBLink = {
      locations: ['Worldwide'],
      terms: ['flights to nicaragua'],
      timeRanges: ['today 5-y'],
      updatedDate: currentDate,
      url: 'https://trends.google.com/trends/explore?q=flights+to+nicaragua&date=today+5-y',
    }

    this.create(airTravelGroup, flightsToNicaragua)

    this.create(drinksGroup, topoChico)
    this.create(drinksGroup, redBull)

    return true
  }
}

let linkDB = new LINKDB()
export default linkDB
