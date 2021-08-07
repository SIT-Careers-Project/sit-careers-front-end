import { makeAutoObservable } from 'mobx'
import apiService from '../services/apiReport'
import { createContext } from 'react'
import dayjs from 'dayjs'
import _ from 'lodash'

export class ReportInfoPageContext {
  fileZip
  isDownload
  selectRows
  nameReports
  rowApplication

  constructor() {
    this.fileZip = ''
    this.selectRows = []
    this.nameReports = []
    this.isDownload = false
    this.rowApplication = false
    makeAutoObservable(this)
  }

  setSelectRows = (selectRows) => {
    this.nameReports = []
    if (selectRows.length === 4) {
      this.handleSelectReports('all')
      this.rowApplication = true
      console.log('nameReport: ', this.nameReports)
    } else {
      _.map(selectRows, (item) => {
        if (item.tableData.id === 0) {
          this.handleSelectReports('company')
        } else if (item.tableData.id === 1) {
          this.handleSelectReports('announcement')
        } else if (item.tableData.id === 2) {
          this.handleSelectReports('dashboard')
        } else if (item.tableData.id === 3) {
          this.rowApplication = true
        }
      })
    }
  }

  setNameReports = (nameReports) => {
    this.nameReports = nameReports
  }

  handleSelectReports = (data) => {
    let newArray = [...this.nameReports, data]
    if (this.nameReports.includes(data)) {
      newArray = newArray.filter((report) => report !== data)
    }
    this.setNameReports(newArray)
  }

  createReport = async (data) => {
    try {
      const startDate = dayjs(data[0]).format('YYYY-MM-DD')
      const endDate = dayjs(data[1]).format('YYYY-MM-DD')
      const response = await apiService.createReport({
        name_reports: this.nameReports,
        start_date: startDate,
        end_date: endDate
      })
      this.isDownload = true
      return response
    } catch (error) {
      console.log(error)
    }
  }

  createApplicationReportByAdmin = async (data) => {
    try {
      const startDate = dayjs(data[0]).format('YYYY-MM-DD')
      const endDate = dayjs(data[1]).format('YYYY-MM-DD')
      const response = await apiService.createApplicationReportByAdmin({
        start_date: startDate,
        end_date: endDate
      })
      this.isDownload = true
      this.rowApplication = false
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
export const reportInfoPageContext = createContext(new ReportInfoPageContext())
