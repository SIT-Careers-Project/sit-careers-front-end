import { makeAutoObservable } from 'mobx'

import apiService from '../services/apiDashboard'
import { createContext } from 'react'
import _ from 'lodash'
import * as d3 from 'd3-scale-chromatic'
import dynamicColor from '../components/DynamicColor'

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

    const dataLength = labels.length

    const colorScale = d3.interpolateBlues

    const colorRangeInfo = {
      colorStart: 0,
      colorEnd: 1,
      useEndAsStart: true
    }

    const randomColor = dynamicColor(dataLength, colorScale, colorRangeInfo)

    return {
      labels: labels,
      datasets: [
        {
          label: 'data for pie chart',
          data: countData,
          backgroundColor: randomColor,
          borderColor: randomColor,
          borderWidth: 1
        }
      ]
    }
  }
}

export const dashboardPageContext = createContext(new DashboardPageContext())
