import { makeAutoObservable } from 'mobx'
import apiService from '../services/apiReport'
import { createContext } from 'react'
import dayjs from 'dayjs'
import _ from 'lodash'

export class ReportInfoPageContext {
  pathFileCompanies
  pathFileAnnouncements
  pathFileDashboard
  isDownload
  selectRows

  constructor() {
    this.pathFileCompanies = ''
    this.pathFileAnnouncements = ''
    this.pathFileDashboard = ''
    this.selectRows = []
    this.isDownload = false
    makeAutoObservable(this)
  }

  setSelectRows = (selectRows) => {
    this.selectRows = _.map(selectRows, (item) => {
      return item.tableData.id
    })
  }

  getCompaniesByFilterDate = async (data) => {
    try {
      const startDate = dayjs(data[0]).format('YYYY-MM-DD')
      const endDate = dayjs(data[1]).format('YYYY-MM-DD')
      const response = await apiService.getCompaniesByFilterDate(startDate, endDate)
      this.pathFileCompanies = response.data.message
      this.isDownload = true
    } catch (error) {
      console.log(error)
    }
  }
  getAnnouncementsByFilterDate = async (data) => {
    try {
      const startDate = dayjs(data[0]).format('YYYY-MM-DD')
      const endDate = dayjs(data[1]).format('YYYY-MM-DD')
      const response = await apiService.getAnnouncementsByFilterDate(startDate, endDate)
      this.pathFileAnnouncements = response.data.message
      this.isDownload = true
    } catch (error) {
      console.log(error)
    }
  }
  getDashboardByFilterDate = async (data) => {
    try {
      const startDate = dayjs(data[0]).format('YYYY-MM-DD')
      const endDate = dayjs(data[1]).format('YYYY-MM-DD')
      const response = await apiService.getDashboardByFilterDate(startDate, endDate)
      this.pathFileDashboard = response.data.message
      this.isDownload = true
    } catch (error) {
      console.log(error)
    }
  }
}
export const reportInfoPageContext = createContext(new ReportInfoPageContext())
