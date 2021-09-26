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
    const keys = _.uniq(keySearch)
    const options = {
      isCaseSensitive: true,
      minMatchCharLength: 2,
      keys: keys
    }
    const fuse = new Fuse(toJS(items), options)
    if (flattenSearchValue.length > 0) {
      _.forEach(flattenSearchValue, (value) => {
        if (value) {
          data = [...data, fuse.search(value)]
        }
      })
      if (_.flattenDeep(data).length === 0) {
        return []
      }
      return _.uniq(_.map(_.flattenDeep(toJS(data)), (data) => data.item))
    }
    return items
  }
}
export const searchContext = createContext(new SearchContext())
