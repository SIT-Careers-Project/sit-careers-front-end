import { action, makeObservable, observable } from 'mobx'

import Router from 'next/router'
import apiCompany from '../../Company/services/apiCompany'
import apiService from '../services/apiAcademicIndustry'
import { createContext } from 'react'
import { checkStatus } from '../../../core/services/utils'

export class AnnouncementFormPageContext {
  announcementType
  modal
  jobPositions
  modalDisable
  autoCompleteCompany
  alert

  constructor() {
    makeObservable(this, {
      announcementType: observable,
      modal: observable,
      jobPositions: observable,
      autoCompleteCompany: observable,
      modalDisable: observable,
      keyChange: action,
      createAnnouncement: action,
      getAutoCompleteCompanies: action,
      getAutoCompleteJobPositions: action
    })
    this.autoCompleteCompany = []
    this.jobPositions = []
    this.announcementType = []
    this.modalDisable = false
  }

  setAnnouncementType = (announcementType) => {
    this.announcementType = announcementType
  }

  keyChange = (key, value) => {
    this[key] = value
  }

  getAutoCompleteCompanies = async () => {
    try {
      await apiCompany.getAllCompanies().then((response) => {
        this.autoCompleteCompany = response.data
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

  getAutoCompleteJobPositions = async () => {
    try {
      await apiService.getJosPositions().then((response) => {
        this.jobPositions = response.data
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

  createAnnouncement = async (data) => {
    try {
      const checkOpen = checkStatus(data.start_date, data.end_date, data.status)
      data.status = checkOpen
      await apiService.createAnnouncement(data).then(() => {
        this.modalDisable = true
        this.modal.closeModal()
        Router.push('/academic-industry/info-management')
      })
    } catch (error) {
      console.log(error)
      this.alert.setAlert(
        `ไม่สามารถสร้างประกาศรับสมัครงานได้ เนื่องจาก ${error.response?.data?.message}`,
        'error',
        'error',
        true
      )
    }
  }
}
export const announcementFormPageContext = createContext(new AnnouncementFormPageContext())
