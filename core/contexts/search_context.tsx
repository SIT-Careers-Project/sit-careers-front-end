import { action, makeObservable, observable } from 'mobx'

import { createContext } from 'react'
import { matchSorter } from 'match-sorter'

export class SearchContext {
  items

  constructor() {
    makeObservable(this, {
      setSearchItems: action,
      items: observable
    })
  }

  setSearchItems = (value, items, keySearch) => {
    return matchSorter(items, value, {
      keys: keySearch
    })
  }
}

export const searchContext = createContext(new SearchContext())
