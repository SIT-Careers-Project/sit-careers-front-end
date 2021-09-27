import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import _ from 'lodash'

import apiService from '../services/apiAcademicIndustry'
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
  filterSearch
  status
  isLoading

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
    this.filterSearch = []
    this.isLoading = false
  }
  setAnnouncements = (announcements) => {
    this.announcements = announcements
  }
  setValue = (key, value) => {
    this[key] = value
  }

  removeKeySearch = (keySearch) => {
    this.filterSearch = _.remove(this.filterSearch, function (keyFilter) {
      const result = _.forEach(keySearch, (key) => {
        return keyFilter.name === key
      })
      return result
    })
  }

  getAnnouncements = async () => {
    try {
      this.isLoading = true
      const response = await apiService.getAllAnnouncement()
      const jobPosition = await apiService.getJosPositions()
      this.jobPositions = jobPosition.data
      this.announcements = sortAnnouncement(response.data, ['start_date'])
      this.beforeSearch = response.data
      this.announcementDetail = this.announcements[0]
      this.isLoading = false
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

  getAnnouncementById = async (announcementId) => {
    try {
      this.isLoading = true
      const response = await apiService.getAnnouncementById(announcementId)
      console.log(response.data[0])
      this.announcementDetail = response.data[0]
      this.announcements = response.data

      const jobPosition = await apiService.getJosPositions()
      this.jobPositions = jobPosition.data

      const responseAll = await apiService.getAllAnnouncement()
      this.beforeSearch = responseAll.data
      this.isLoading = false
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
