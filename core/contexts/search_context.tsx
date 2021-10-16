import { toJS, makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import { matchSorter } from 'match-sorter'
import _ from 'lodash'
import Fuse from 'fuse.js'

export class SearchContext {
  constructor() {
    makeAutoObservable(this)
  }

  setSearchItems = (value, items, keySearch) => {
    return matchSorter(items, value, {
      keys: keySearch
    })
  }

  searchMultiFilter = (value, items, keySearch) => {
    _.remove(value, (data) => data === '' || data.length === 0)

    if (value.length === 0) {
      return items
    }

    const search = []
    _.flattenDeep(value).forEach((element) => {
      const matched = toJS(this.setSearchItems(element, items, keySearch))[0]
      if (matched) {
        search.unshift(matched)
      }
    })

    return _.uniqWith(search, _.isEqual)
  }

  searchMultiFilterWithFuse = (items, searchValue, keySearch) => {
    let data = []
    const flattenSearchValue = _.without(_.flattenDeep(searchValue), '')
    const byCompanyName = this.searchByCompanyName(keySearch, items, flattenSearchValue)

    const keys = _.sortedUniq(toJS(keySearch))
    const options = {
      minMatchCharLength: 28,
      includeScore: true,
      keys: _.remove(
        toJS(keys),
        (array) => array.name === 'company_name_th' || array.name === 'company_name_en'
      )
    }
    const fuse = new Fuse(toJS(items), options)
    if (flattenSearchValue.length > 0) {
      _.forEach(flattenSearchValue, (value) => {
        if (value) {
          data = [...data, fuse.search(value)]
        }
      })
      if (_.flattenDeep(data).length === 0 && byCompanyName.length === 0) {
        return []
      }
      return _.uniq(_.map(_.flattenDeep([toJS(data), byCompanyName]), (data) => data.item))
    }
    return items
  }

  searchByCompanyName = (keySearch, items, searchValue) => {
    let byCompanyName = []
    let checkCompanyNameTH = false
    let checkCompanyNameEN = false
    const keySearchHasName = _.without(
      _.map(keySearch, (data) => data.name),
      undefined
    )

    if (keySearchHasName.length > 0) {
      checkCompanyNameTH = _.indexOf(keySearchHasName, 'company_name_th') !== -1
      checkCompanyNameEN = _.indexOf(keySearchHasName, 'company_name_en') !== -1
    } else {
      checkCompanyNameTH = _.indexOf(keySearch, 'company_name_th') !== -1
      checkCompanyNameEN = _.indexOf(keySearch, 'company_name_en') !== -1
    }

    if (checkCompanyNameTH || checkCompanyNameEN) {
      const searchByCompanyName = new Fuse(items, {
        minMatchCharLength: 3,
        keys: ['company_name_th', 'company_name_en']
      })
      byCompanyName = searchByCompanyName.search(searchValue.join(' '))
    }

    return byCompanyName
  }
}

export const searchContext = createContext(new SearchContext())
