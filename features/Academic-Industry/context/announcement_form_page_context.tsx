import { action, makeObservable, observable } from 'mobx'
import { createContext } from 'react'
import apiService from '../services/apiAcademicIndustry'
import Router from 'next/router'

export class AnnouncementFormPageContext {
  announcementType
  modal

  constructor() {
    makeObservable(this, {
      announcementType: observable,
      modal: observable,
      keyChange: action,
      createAnnouncement: action
    })
    this.announcementType = []
  }

  setAnnouncementType = (announcementType) => {
    this.announcementType = announcementType
  }

  keyChange = (key, value) => {
    this[key] = value
  }

  createAnnouncement = async (data) => {
    try {
      await apiService.createAnnouncement(data).then(() => {
        this.modal.closeModal()
        Router.push('/academic-industry/info-management')
      })
    } catch (error) {
      console.log(error)
    }
  }
}
export const announcementFormPageContext = createContext(new AnnouncementFormPageContext())
