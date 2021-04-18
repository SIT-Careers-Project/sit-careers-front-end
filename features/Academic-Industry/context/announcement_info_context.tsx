import { makeAutoObservable } from 'mobx'
import { sortAnnouncement } from '../../../core/services/utils'
import apiService from '../services/apiAcademicIndustry'
import { createContext } from 'react'

export class AnnouncementInfoContext {
  announcements
  beforeSearch

  constructor() {
    this.announcements = []
    this.beforeSearch = []

    makeAutoObservable(this)
  }

  setAnnouncements = (announcements) => {
    this.announcements = announcements
  }

  getAnnouncements = async () => {
    try {
      const response = await apiService.getAllAnnouncement()
      this.announcements = sortAnnouncement(response.data, ['start_date'])
      this.beforeSearch = response.data
    } catch (error) {
      console.log(error)
    }
  }

  getAnnouncementByCompany = async () => {
    try {
      const response = await apiService.getAnnouncementByCompany()
      this.announcements = sortAnnouncement(response.data, ['start_date'])
      this.beforeSearch = response.data
    } catch (error) {
      console.log(error)
    }
  }
}

export const announcementInfoContext = createContext(new AnnouncementInfoContext())
