import { action, makeObservable, observable } from 'mobx'

import apiService from '../services/apiAcademicIndustry'
import { createContext } from 'react'

export class AnnouncementInfoContext {
  announcements
  beforeSearch

  constructor() {
    makeObservable(this, {
      getAnnouncements: action,
      setAnnouncements: action,
      announcements: observable,
      beforeSearch: observable
    })
    this.announcements = []
    this.beforeSearch = []
  }

  setAnnouncements = (announcements) => {
    this.announcements = announcements
  }

  getAnnouncements = async () => {
    try {
      const response = await apiService.getAllAnnouncement()
      this.announcements = response.data
      this.beforeSearch = response.data
    } catch (error) {
      console.log(error)
    }
  }
}

export const announcementInfoContext = createContext(new AnnouncementInfoContext())
