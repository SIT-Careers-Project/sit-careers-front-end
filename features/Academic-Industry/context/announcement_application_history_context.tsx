import { makeAutoObservable } from 'mobx'

import { createContext } from 'react'
import apiAcademic from '../services/apiAcademicIndustry'

export class ApplicationHistoryContext {
  modal
  applications

  constructor() {
    this.modal = ''
    this.applications = []

    makeAutoObservable(this)
  }

  keyChange = (key, value) => {
    this[key] = value
  }

  getAnnouncementApplicationByAdmin = async () => {
    try {
      const response = await apiAcademic.getAnnouncementResumeByAdmin()
      this.applications = response.data
    } catch (error) {
      console.log(error)
    }
  }

  getAnnouncementApplicationByStudent = async () => {
    try {
      const response = await apiAcademic.getAnnouncementResumeByStudent()
      this.applications = response.data
    } catch (error) {
      console.log(error)
    }
  }

  getAnnouncementApplicationByCompany = async () => {
    try {
      const response = await apiAcademic.getAnnouncementResumeByCompany()
      this.applications = response.data
    } catch (error) {
      console.log(error)
    }
  }
}
export const applicationHistoryContext = createContext(new ApplicationHistoryContext())
