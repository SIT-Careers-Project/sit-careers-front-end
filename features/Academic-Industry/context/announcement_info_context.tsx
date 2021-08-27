import { makeAutoObservable, configure } from 'mobx'
import { sortAnnouncement } from '../../../core/services/utils'
import apiService from '../services/apiAcademicIndustry'
import { createContext } from 'react'

configure({
  enforceActions: 'never'
})
export class AnnouncementInfoContext {
  announcements
  beforeSearch
  alert

  constructor() {
    this.announcements = []
    this.beforeSearch = []

    makeAutoObservable(this)
  }

  keyChange = (key, value) => {
    this[key] = value
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
    }
  }

  getAnnouncementByCompany = async () => {
    try {
      const response = await apiService.getAnnouncementByCompany()
      this.announcements = sortAnnouncement(response.data, ['start_date'])
      this.beforeSearch = response.data
    } catch (error) {
      console.log(error)
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
    }
  }
}

export const announcementInfoContext = createContext(new AnnouncementInfoContext())
