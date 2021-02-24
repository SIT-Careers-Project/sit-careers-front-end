import { action, makeObservable, observable } from 'mobx'
import apiService from '../services/apiAcademicIndustry'
import { createContext } from 'react'
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
  constructor() {
    makeObservable(this, {
      getAnnouncements: action,
      setAnnouncements: action,
      announcements: observable,
      beforeSearch: observable,
      companyName: observable,
      announcementTitle: observable,
      jobPositions: observable,
      jobPosition: observable,
      jobType: observable,
      companyType: observable,
      announcementDetail: observable
    })
    this.announcements = []
    this.beforeSearch = []
    this.companyName = ''
    this.jobPositions = []
    this.announcementDetail = []
    this.announcementTitle = ''
    this.jobType = ''
    this.companyType = ''
    this.jobPosition = ''
  }
  setAnnouncements = (announcements) => {
    this.announcements = announcements
  }
  setValue = (key, value) => {
    this[key] = value
  }
  getAnnouncements = async () => {
    try {
      const response = await apiService.getAllAnnouncement()
      const jobPosition = await apiService.getJosPositions()
      this.jobPositions = jobPosition.data
      this.announcements = response.data
      this.beforeSearch = response.data
      this.announcementDetail = response.data[0]
    } catch (error) {
      console.log(error)
    }
  }
}
export const announcementSearchPageContext = createContext(new AnnouncementSearchPageContext())
