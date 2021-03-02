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

  renderDelay

  startDate
  endDate

  constructor() {
    makeObservable(this, {
      getAnnouncement: action,
      updateAnnouncement: action,
      autoCompleteCompany: observable,
      showModal: observable,
      announcement: observable,
      startDate: observable,
      endDate: observable,
      renderDelay: observable,
      getAutoCompleteCompanies: action,
      getAutoCompleteJobPositions: action
    })
    this.announcement = []
    this.jobPositions = []
    this.autoCompleteCompany = []
    this.endDate = ''
    this.startDate = ''
    this.renderDelay = true
  }

  keyChange = (key, value) => {
    this[key] = value
  }

  getAnnouncement = async (announcement_id) => {
    try {
      const response = await apiService.getAnnouncementById(announcement_id)
      this.announcement = response.data
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
