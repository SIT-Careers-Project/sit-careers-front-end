import { makeAutoObservable } from 'mobx'

import apiService from '../services/apiDashboard'
import { createContext } from 'react'
import _ from 'lodash'

export class DashboardPageContext {
  companyTypes
  studentJobPositions
  announcementJobPositions
  chartCompanyType
  chartStudentJobPositions
  chartAnnouncementJobPositions

  constructor() {
    makeAutoObservable(this)
    this.companyTypes = []
    this.studentJobPositions = []
    this.announcementJobPositions = []
    this.chartCompanyType = []
    this.chartAnnouncementJobPositions = []
    this.chartStudentJobPositions = []
  }

  getCompanyTypes = async () => {
    try {
      const response = await apiService.getCompanyTypes()
      this.companyTypes = response.data
      this.chartCompanyType = this.convertFormatChart(
        this.companyTypes,
        'company_type',
        'count_company_type'
      )
    } catch (error) {
      console.log(error)
    }
  }

  getStudentJobPositions = async () => {
    try {
      const response = await apiService.getStudentJobPositions()
      this.studentJobPositions = response.data
      this.chartStudentJobPositions = this.convertFormatChart(
        this.studentJobPositions,
        'job_position',
        'count_job_position'
      )
    } catch (error) {
      console.log(error)
    }
  }

  getAnnouncementJobPositions = async () => {
    try {
      const response = await apiService.getAnnouncementJobPositions()
      this.announcementJobPositions = response.data
      this.chartAnnouncementJobPositions = this.convertFormatChart(
        this.announcementJobPositions,
        'job_position',
        'count_job_position'
      )
    } catch (error) {
      console.log(error)
    }
  }

  convertFormatChart = (data, key, keyCount) => {
    const labels = _.map(data, key)
    const countData = _.map(data, keyCount)
    return {
      labels: labels,
      datasets: [
        {
          label: '# of Votes',
          data: countData,
          backgroundColor: [
            '#168FBD',
            '#adadad',
            '#295B8D',
            '#008888',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            '#168FBD',
            '#adadad',
            '#295B8D',
            '#008888',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    }
  }
}

export const dashboardPageContext = createContext(new DashboardPageContext())
