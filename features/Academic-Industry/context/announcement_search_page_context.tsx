import { makeAutoObservable } from 'mobx'
import apiService from '../services/apiAcademicIndustry'
import { createContext } from 'react'
import { sortAnnouncement } from 'core/services/utils'
export class AnnouncementSearchPageContext {
  announcements
  beforeSearch
  companyName
  announcementTitle
  jobPositions
  jobPosition
  jobType
  companyType
  announcementDetail
  status
  constructor() {
    makeAutoObservable(this)
    this.announcements = []
    this.beforeSearch = []
    this.companyName = ''
    this.jobPositions = []
    this.announcementDetail = []
    this.announcementTitle = ''
    this.jobType = []
    this.companyType = []
    this.jobPosition = []
    this.status = []
  }
  setAnnouncements = (announcements) => {
    this.announcements = announcements || []
  }
  setValue = (key, value) => {
    this[key] = value
  }
  getAnnouncements = async () => {
    try {
      const response = await apiService.getAllAnnouncement()
      const jobPosition = await apiService.getJosPositions()
      this.jobPositions = jobPosition.data
      this.announcements = sortAnnouncement(response.data, ['start_date'])
      this.beforeSearch = response.data
      this.announcementDetail = response.data[0]
    } catch (error) {
      console.log(error)
    }
  }
}
export const announcementSearchPageContext = createContext(new AnnouncementSearchPageContext())
