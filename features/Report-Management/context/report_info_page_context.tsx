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

  constructor() {
    this.fileZip = ''
    this.selectRows = []
    this.nameReports = []
    this.isDownload = false
    makeAutoObservable(this)
  }

  setSelectRows = (selectRows) => {
    this.nameReports = []
    if (selectRows.length === 3) {
      this.handleSelectReports('all')
      console.log('nameReport: ', this.nameReports)
    } else {
      _.map(selectRows, (item) => {
        if (item.tableData.id === 0) {
          this.handleSelectReports('company')
        } else if (item.tableData.id === 1) {
          this.handleSelectReports('announcement')
        } else if (item.tableData.id === 2) {
          this.handleSelectReports('dashboard')
        }
        console.log('nameReport: ', this.nameReports)
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
}
export const reportInfoPageContext = createContext(new ReportInfoPageContext())
