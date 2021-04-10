import { makeAutoObservable } from 'mobx'

import { createContext } from 'react'
import apiAcademic from '../services/apiAcademicIndustry'
import _ from 'lodash'

export class ApplicationHistoryContext {
  modal
  applications
  status
  statusTemp

  constructor() {
    this.modal = ''
    this.applications = []
    this.status = {}
    this.statusTemp = ['เรียกสัมภาษณ์', 'รออนุมัติ', 'เสร็จสิ้น', 'ปฏิเสธการรับสมัครงาน']

    makeAutoObservable(this)
  }

  keyChange = (key, value) => {
    this[key] = value
  }

  getAnnouncementApplicationByAdmin = async () => {
    try {
      const response = await apiAcademic.getAnnouncementResumeByAdmin()
      this.applications = this.convertStatus(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  convertStatus = (data) => {
    _.map(data, (item) => {
      const findStatus = _.findIndex(this.statusTemp, (status) => status === item.status)
      item.status = findStatus
    })
    return data
  }

  updateApplication = async (data) => {
    try {
      data.status = this.statusTemp[data.status]
      await apiAcademic.updateAnnouncementResume(data)
    } catch (error) {
      console.log(error)
    }
  }
}
export const applicationHistoryContext = createContext(new ApplicationHistoryContext())
