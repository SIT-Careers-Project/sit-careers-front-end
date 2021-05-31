import { makeAutoObservable, runInAction, configure } from 'mobx'

import { createContext } from 'react'
import apiAcademic from '../services/apiAcademicIndustry'
import Router from 'next/router'

configure({
  enforceActions: 'never'
})
export class AnnouncementApplicationFormContext {
  modal
  announcement
  resume
  renderDelay
  disableButton
  alert

  constructor() {
    this.modal = ''
    this.announcement = ''
    this.resume = ''
    this.renderDelay = true
    this.disableButton = false
    this.alert = ''

    makeAutoObservable(this)
  }

  keyChange = (key, value) => {
    this[key] = value
  }

  getResumeByUserId = async () => {
    try {
      const response = await apiAcademic.getResumeByUserId()
      this.resume = response.data[0]
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

  getAnnouncementById = async (announcementId) => {
    try {
      const response = await apiAcademic.getAnnouncementById(announcementId)
      runInAction(() => {
        this.announcement = response.data[0]
      })
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

  createApplication = async (data) => {
    try {
      this.disableButton = true
      await apiAcademic.createAnnouncementResume(data).then(() => {
        this.disableButton = false
        this.modal.closeModal()
        Router.push('/academic-industry/applications/history')
      })
    } catch (error) {
      this.disableButton = false
      this.modal.closeModal()
      if (error.response?.status === 401) {
        this.alert.setAlert(
          'เกิดข้อผิดพลาดเนื่องจากคุกกี้หมดอายุ กรุณา login ใหม่',
          'error',
          'error',
          true
        )
      } else {
        this.alert.setAlert(
          `ไม่สามารถสมัครงานได้ เนื่องจาก ${error.response?.data?.message}`,
          'error',
          'error',
          true
        )
      }
    }
  }
}
export const announcementApplicationFormContext = createContext(
  new AnnouncementApplicationFormContext()
)
