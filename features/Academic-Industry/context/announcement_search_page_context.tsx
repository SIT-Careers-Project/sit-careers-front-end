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
      getMenuItemJobPositions: action,
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
  setCompanyName = (companyName) => {
    this.companyName = companyName
  }
  setAnnouncementTitle = (announcementTitle) => {
    this.announcementTitle = announcementTitle
  }
  setJobPosition = (jobPosition) => {
    this.jobPosition = jobPosition
  }
  setJobType = (jobType) => {
    this.jobType = jobType
  }
  setCompanyType = (companyType) => {
    this.companyType = companyType
  }
  setAnnouncementDetail = (announcementDetail) => {
    this.announcementDetail = announcementDetail
    console.log(announcementDetail)
  }
  setAnnouncements = (announcements) => {
    this.announcements = announcements
  }
  getMenuItemJobPositions = async () => {
    try {
      await apiService.getJosPositions().then((response) => {
        this.jobPositions = response.data
      })
    } catch (error) {
      console.log(error)
    }
  }
  getAnnouncements = async () => {
    try {
      const response = await apiService.getAllAnnouncement()
      this.announcements = response.data
      this.beforeSearch = response.data
      this.announcementDetail = response.data[0]
    } catch (error) {
      console.log(error)
    }
  }
}
export const announcementSearchPageContext = createContext(new AnnouncementSearchPageContext())
