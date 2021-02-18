import { action, makeObservable, observable } from 'mobx'

import Router from 'next/router'
import apiService from '../services/apiAcademicIndustry'
import apiCompany from '../../Company/services/apiCompany'
import { createContext } from 'react'

export class AnnouncementUpdatePageContext {
  showModal
  announcement
  modal
  autoCompleteCompany
  jobPositions

  constructor() {
    makeObservable(this, {
      getAnnouncement: action,
      updateAnnouncement: action,
      autoCompleteCompany: observable,
      showModal: observable,
      announcement: observable,
      getAutoCompleteCompanies: action,
      getAutoCompleteJobPositions: action
    })
    this.announcement = []
    this.autoCompleteCompany = []
  }

  keyChange = (key, value) => {
    this[key] = value
  }

  getAnnouncement = async (announcement_id) => {
    this.announcement = []
    try {
      const response = await apiService.getAnnouncementById(announcement_id)
      this.announcement = response.data
    } catch (error) {
      console.log(error)
    }
  }

  updateAnnouncement = async (data) => {
    try {
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
