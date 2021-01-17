import { action, makeObservable, observable } from 'mobx'
import { createContext } from 'react'

export class AnnouncementFormPageContext {
  showModal
  announcementType

  constructor() {
    makeObservable(this, {
      handleModal: action,
      showModal: observable,
      announcementType: observable
    })
    this.showModal = false
    this.announcementType = []
  }

  setAnnouncementType = (announcementType) => {
    this.announcementType = announcementType
  }

  handleModal = () => {
    this.showModal = true
  }

  handleCloseModal = () => {
    this.showModal = false
  }
}
export const announcementFormPageContext = createContext(new AnnouncementFormPageContext())
