import { action, makeObservable, observable } from 'mobx'

import { createContext } from 'react'

export class AnnouncementApplicationFormContext {
  modal

  constructor() {
    makeObservable(this, {
      modal: observable,
      keyChange: action
    })
  }

  keyChange = (key, value) => {
    this[key] = value
  }
}
export const announcementApplicationFormContext = createContext(
  new AnnouncementApplicationFormContext()
)
