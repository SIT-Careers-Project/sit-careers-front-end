import { makeAutoObservable } from 'mobx'

import { createContext } from 'react'
import apiAcademic from '../services/apiAcademicIndustry'

export class ApplicationHistoryContext {
  modal
  applications
  alert

  constructor() {
    this.modal = ''
    this.applications = []

    makeAutoObservable(this)
  }

  keyChange = (key, value) => {
    this[key] = value
  }

  getAnnouncementApplicationByAdmin = async () => {
    try {
      const response = await apiAcademic.getAnnouncementResumeByAdmin()
      this.applications = response.data
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

  getAnnouncementApplicationByStudent = async () => {
    try {
      const response = await apiAcademic.getAnnouncementResumeByStudent()
      this.applications = response.data
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

  getAnnouncementApplicationByCompany = async () => {
    try {
      const response = await apiAcademic.getAnnouncementResumeByCompany()
      this.applications = response.data
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

  createApplicationReportByCompany = async () => {
    try {
      const response = await apiAcademic.createApplicationReportByCompany({})
      return response
    } catch (error) {
      console.log(error)
      this.alert.setAlert(
        `ไม่สามารถสร้างได้ เนื่องจาก ${error.response?.data?.message}`,
        'error',
        'error',
        true
      )
    }
  }
}
export const applicationHistoryContext = createContext(new ApplicationHistoryContext())
