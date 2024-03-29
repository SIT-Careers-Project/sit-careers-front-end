import { makeAutoObservable } from 'mobx'
import apiService from '../services/apiAcademicIndustry'
import { createContext } from 'react'
import Router from 'next/router'

export class AnnouncementStatusInfoContext {
  showModal
  application
  applicationDate
  checkStatus
  isDisable
  modal
  modalDelete
  alert
  isLoading

  constructor() {
    this.applicationDate = ''
    this.checkStatus = ''
    this.application = []
    this.isDisable = true
    this.modalDelete = false
    this.isLoading = false

    makeAutoObservable(this)
  }

  keyChange = (key, value) => {
    this[key] = value
  }

  setCheckStatus = (checkStatus) => {
    this.isDisable = true
    this.checkStatus = checkStatus
    if (this.checkStatus === 'ปฏิเสธการรับสมัคร') {
      this.isDisable = false
    }
  }

  getAnnouncementResumeByIdForAdmin = async (announcement_resume_id) => {
    try {
      this.isLoading = true
      this.isDisable = true
      this.application = []
      const response = await apiService.getAnnouncementResumeById(announcement_resume_id)
      this.application = response.data[0]
      this.isLoading = false
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

  getAnnouncementResumeByIdForCompanyId = async (announcement_resume_id) => {
    try {
      this.isLoading = true
      this.isDisable = true
      this.application = []
      const response = await apiService.getAnnouncementResumeByIdForCompanyId(
        announcement_resume_id
      )
      this.application = response.data[0]
      this.isLoading = false
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

  getAnnouncementResumeByIdForUserId = async (announcement_resume_id) => {
    try {
      this.isLoading = true
      this.isDisable = true
      this.application = []
      const response = await apiService.getAnnouncementResumeByIdForUserId(announcement_resume_id)
      this.application = response.data[0]
      this.isLoading = false
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

  updateAnnouncementResume = async (data) => {
    try {
      await apiService.updateAnnouncementResume(data).then(() => {
        this.modal.closeModal()
        Router.push('/academic-industry/applications/history')
      })
    } catch (error) {
      console.log(error)
      this.alert.setAlert(
        `ไม่สามารถแก้ข้อมูลได้ เนื่องจาก ${error.response?.data?.message}`,
        'error',
        'error',
        true
      )
    }
  }

  handlerModal = (isDeleteModal, openModal) => {
    openModal()
    this.modalDelete = isDeleteModal
  }
}

export const announcementStatusInfoContext = createContext(new AnnouncementStatusInfoContext())
