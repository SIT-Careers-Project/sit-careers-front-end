import { action, makeObservable, observable } from 'mobx'

import { createContext } from 'react'

export class PaginationContext {
  page
  itemsPerPage
  sliceDataStart
  sliceDataEnd

  constructor() {
    makeObservable(this, {
      setPage: action,
      setSliceData: action,
      page: observable,
      itemsPerPage: observable,
      sliceDataEnd: observable,
      sliceDataStart: observable
    })
    this.itemsPerPage = 10
    this.page = 1
  }

  setPage = (event, value) => {
    this.page = value
    this.setSliceData()
  }

  setSliceData = () => {
    this.sliceDataStart = (this.page - 1) * this.itemsPerPage
    this.sliceDataEnd = this.page * this.itemsPerPage
  }

  setSliceAnnouncement = () => {
    this.itemsPerPage = 6
    this.sliceDataStart = (this.page - 1) * this.itemsPerPage
    this.sliceDataEnd = this.page * this.itemsPerPage
  }
}

export const paginationContext = createContext(new PaginationContext())
