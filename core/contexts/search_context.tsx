import { action, makeObservable, observable } from 'mobx'
import { createContext } from 'react'
import { matchSorter } from 'match-sorter'
export class SearchContext {
  items
  constructor() {
    makeObservable(this, {
      setSearchItems: action,
      items: observable,
      searchMultiFilter: action
    })
  }
  setSearchItems = (value, items, keySearch) => {
    return matchSorter(items, value, {
      keys: keySearch
    })
  }
  matchSorterAcrossKeys = (list, search, options) => {
    const joinedKeysString = (item) => options.keys.map((key) => item[key]).join(' ')
    return matchSorter(list, search, {
      ...options,
      keys: [...options.keys, joinedKeysString]
    })
  }
  searchMultiFilter = (value, items, keySearch) => {
    const search = this.matchSorterAcrossKeys(items, value, {
      keys: keySearch
    })
    return search
  }
}
export const searchContext = createContext(new SearchContext())
