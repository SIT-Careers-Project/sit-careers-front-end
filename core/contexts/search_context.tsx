import { toJS, makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import { matchSorter } from 'match-sorter'
import _ from 'lodash'

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
}
export const searchContext = createContext(new SearchContext())
