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
  alert

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
      if (error.response.status === 401) {
        this.alert.setAlert(
          'เกิดข้อผิดพลาดเนื่องจากคุกกี้หมดอายุ กรุณา login ใหม่',
          'error',
          'error',
          true
        )
      } else {
        this.alert.setAlert(
          'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ ไม่สามารถดีงข้อมูลได้',
          'error',
          'error',
          true
        )
      }
      console.log(error)
    }
  }
}
export const announcementSearchPageContext = createContext(new AnnouncementSearchPageContext())
