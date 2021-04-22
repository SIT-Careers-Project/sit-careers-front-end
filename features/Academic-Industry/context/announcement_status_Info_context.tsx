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

  constructor() {
    this.applicationDate = ''
    this.checkStatus = ''
    this.application = []
    this.isDisable = true
    this.modalDelete = false

    makeAutoObservable(this)
  }

  keyChange = (key, value) => {
    this[key] = value
  }

  setCheckStatus = (checkStatus) => {
    this.isDisable = true
    this.checkStatus = checkStatus
    if (this.checkStatus === 'ปฏิเสธการรับสมัคร') {
      console.log(this.checkStatus)
      this.isDisable = false
    }
  }

  getAnnouncementResumeByIdForAdmin = async (announcement_resume_id) => {
    this.isDisable = true
    this.application = []
    try {
      const response = await apiService.getAnnouncementResumeById(announcement_resume_id)
      this.application = response.data[0]
    } catch (error) {
      console.log(error)
    }
  }

  getAnnouncementResumeByIdForCompanyId = async (announcement_resume_id) => {
    this.isDisable = true
    this.application = []
    try {
      const response = await apiService.getAnnouncementResumeByIdForCompanyId(
        announcement_resume_id
      )
      this.application = response.data[0]
    } catch (error) {
      console.log(error)
    }
  }

  getAnnouncementResumeByIdForUserId = async (announcement_resume_id) => {
    this.isDisable = true
    this.application = []
    try {
      const response = await apiService.getAnnouncementResumeByIdForUserId(announcement_resume_id)
      this.application = response.data[0]
    } catch (error) {
      console.log(error)
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
    }
  }

  handlerModal = (isDeleteModal, openModal) => {
    openModal()
    this.modalDelete = isDeleteModal
  }
}

export const announcementStatusInfoContext = createContext(new AnnouncementStatusInfoContext())
