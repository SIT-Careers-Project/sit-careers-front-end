import { makeAutoObservable } from 'mobx'

import { createContext } from 'react'
import apiAcademic from '../services/apiAcademicIndustry'
import Router from 'next/router'
export class AnnouncementApplicationFormContext {
  modal
  announcement

  constructor() {
    this.modal = ''
    this.announcement = ''

    makeAutoObservable(this)
  }

  keyChange = (key, value) => {
    this[key] = value
  }

  getAnnouncementById = async (announcementId) => {
    try {
      const response = await apiAcademic.getAnnouncementById(announcementId)
      this.announcement = response.data
    } catch (error) {
      console.log(error)
    }
  }

  createApplication = async (data) => {
    try {
      await apiAcademic.createApplication(data).then(() => {
        this.modal.closeModal()
        Router.push('/academic-industry/applications/history')
      })
    } catch (error) {
      console.log(error)
    }
  }
}
export const announcementApplicationFormContext = createContext(
  new AnnouncementApplicationFormContext()
)
