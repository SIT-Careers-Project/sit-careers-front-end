import { action, makeObservable, observable } from 'mobx'
import { createContext } from 'react'

export class AnnouncementApplicationFormContext {
  showModal

  constructor() {
    makeObservable(this, {
      handleModal: action,
      showModal: observable
    })
    this.showModal = false
  }

  handleModal = () => {
    this.showModal = true
  }

  handleCloseModal = () => {
    this.showModal = false
  }
}
export const announcementApplicationFormContext = createContext(
  new AnnouncementApplicationFormContext()
)
