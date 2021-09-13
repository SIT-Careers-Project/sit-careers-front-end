import { makeAutoObservable } from 'mobx'

import Router from 'next/router'
import apiService from '../services/apiAcademicIndustry'
import apiCompany from '../../Company/services/apiCompany'
import { createContext } from 'react'
import { checkStatus } from '../../../core/services/utils'

export class AnnouncementUpdatePageContext {
  showModal
  announcement
  modal
  autoCompleteCompany
  jobPositions
  showCloseButton
  renderDelay
  modalCloseAnnouncement
  disableButton
  alert
  isLoading

  startDate
  endDate
  closeDate

  constructor() {
    this.announcement = []
    this.jobPositions = []
    this.autoCompleteCompany = []
    this.endDate = ''
    this.startDate = ''
    this.closeDate = ''
    this.renderDelay = true
    this.showCloseButton = true
    this.modalCloseAnnouncement = false
    this.disableButton = false
    this.isLoading = false

    makeAutoObservable(this)
  }

  keyChange = (key, value) => {
    this[key] = value
  }

  handlerModal = (isAnnouncementModal, openModal) => {
    openModal()
    this.modalCloseAnnouncement = isAnnouncementModal
  }

  getAnnouncement = async (announcement_id) => {
    try {
      this.isLoading = true
      this.getAutoCompleteCompanies().then(async () => {
        this.getAutoCompleteJobPositions()
        const response = await apiService.getAnnouncementById(announcement_id)
        this.announcement = response.data[0]
        this.isLoading = false
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

  updateAnnouncement = async (data) => {
    try {
      this.disableButton = true
      const checkOpen = checkStatus(data.start_date, data.end_date, data.status)
      data.status = checkOpen
      await apiService.updateAnnouncement(data).then(() => {
        this.disableButton = false
        this.modal.closeModal()
        Router.push('/academic-industry/info-management')
      })
    } catch (error) {
      if (error.response.status === 400) {
        this.alert.setAlert(
          `ไม่สามารถแก้ไขข้อมูลได้ เนื่องจากคุณไม่ได้กรอกข้อมูลบางอย่าง กรุณาตรวจสอบข้อมูล`,
          'error',
          'error',
          true
        )
      } else {
        this.alert.setAlert(
          `ไม่สามารถแก้ไขข้อมูลได้ เนื่องจาก ${error.response?.data?.message}`,
          'error',
          'error',
          true
        )
      }
      console.log(error)
    }
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
}

export const announcementUpdatePageContext = createContext(new AnnouncementUpdatePageContext())
