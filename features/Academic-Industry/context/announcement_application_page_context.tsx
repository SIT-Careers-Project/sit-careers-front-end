import { makeAutoObservable } from 'mobx'

import { createContext } from 'react'
import apiAcademic from '../services/apiAcademicIndustry'
import Router from 'next/router'
export class AnnouncementApplicationFormContext {
  modal
  announcement
  resume
  renderDelay

  constructor() {
    this.modal = ''
    this.announcement = ''
    this.resume = ''
    this.renderDelay = true

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
    }
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
      await apiAcademic.createAnnouncementResume(data).then(() => {
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
