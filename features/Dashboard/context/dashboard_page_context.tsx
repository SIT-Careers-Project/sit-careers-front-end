import { makeAutoObservable } from 'mobx'

import apiService from '../services/apiDashboard'
import { createContext } from 'react'
import _ from 'lodash'

export class DashboardPageContext {
  companyTypes
  studentJobPositions
  announcementJobPositions
  labelCompanyType
  labelStudentJobPositions
  labelAnnouncementJobPositions
  countCompanyType
  countStudentJobPositions
  countAnnouncementJobPositions
  chartCompanyType

  constructor() {
    makeAutoObservable(this)
    this.companyTypes = []
    this.studentJobPositions = []
    this.announcementJobPositions = []
    this.labelCompanyType = []
    this.labelStudentJobPositions = []
    this.labelAnnouncementJobPositions = []
    this.countCompanyType = []
    this.countStudentJobPositions = []
    this.countAnnouncementJobPositions = []
    this.chartCompanyType = {}
  }

  getCompanyTypes = async () => {
    try {
      const response = await apiService.getCompanyTypes()
      this.companyTypes = response.data
      this.labelCompanyType = _.map(this.companyTypes, 'company_type')
      this.countCompanyType = _.map(this.companyTypes, 'count_company_type')
      this.chartCompanyType = {
        labels: this.labelCompanyType,
        datasets: [
          {
            label: '# of Votes',
            data: this.countCompanyType,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      }
    } catch (error) {
      console.log(error)
    }
  }

  getStudentJobPositions = async () => {
    try {
      const response = await apiService.getStudentJobPositions()
      this.studentJobPositions = response.data
      this.labelStudentJobPositions = _.map(this.studentJobPositions, 'job_position')
      this.countStudentJobPositions = _.map(this.studentJobPositions, 'count_job_position')
    } catch (error) {
      console.log(error)
    }
  }

  getAnnouncementJobPositions = async () => {
    try {
      const response = await apiService.getAnnouncementJobPositions()
      this.announcementJobPositions = response.data
      this.labelAnnouncementJobPositions = _.map(this.announcementJobPositions, 'job_position')
      this.countAnnouncementJobPositions = _.map(
        this.announcementJobPositions,
        'count_job_position'
      )
    } catch (error) {
      console.log(error)
    }
  }
}

export const dashboardPageContext = createContext(new DashboardPageContext())
