import { action, makeObservable, observable } from 'mobx'

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

  startDate
  endDate
  closeDate

  constructor() {
    makeObservable(this, {
      getAnnouncement: action,
      updateAnnouncement: action,
      autoCompleteCompany: observable,
      showModal: observable,
      announcement: observable,
      showCloseButton: observable,
      startDate: observable,
      endDate: observable,
      renderDelay: observable,
      modalCloseAnnouncement: observable,
      closeDate: observable,
      getAutoCompleteCompanies: action,
      getAutoCompleteJobPositions: action
    })
    this.announcement = []
    this.jobPositions = []
    this.autoCompleteCompany = []
    this.endDate = ''
    this.startDate = ''
    this.closeDate = ''
    this.renderDelay = true
    this.showCloseButton = true
    this.modalCloseAnnouncement = false
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
      const response = await apiService.getAnnouncementById(announcement_id)
      this.announcement = response.data[0]
    } catch (error) {
      console.log(error)
    }
  }

  updateAnnouncement = async (data) => {
    try {
      const checkOpen = checkStatus(data.start_date, data.end_date, data.status)
      data.status = checkOpen
      await apiService.updateAnnouncement(data).then(() => {
        this.modal.closeModal()
        Router.push('/academic-industry/info-management')
      })
    } catch (error) {
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
    }
  }

  getAutoCompleteJobPositions = async () => {
    try {
      await apiService.getJosPositions().then((response) => {
        this.jobPositions = response.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const announcementUpdatePageContext = createContext(new AnnouncementUpdatePageContext())
