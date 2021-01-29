import { action, makeObservable, observable } from 'mobx'

import { createContext } from 'react'

export class AnnouncementFormPageContext {
  announcementType
  modal

  constructor() {
    makeObservable(this, {
      announcementType: observable,
      modal: observable,
      keyChange: action
    })
    this.announcementType = []
  }

  setAnnouncementType = (announcementType) => {
    this.announcementType = announcementType
  }

  keyChange = (key, value) => {
    this[key] = value
  }
}
export const announcementFormPageContext = createContext(new AnnouncementFormPageContext())
