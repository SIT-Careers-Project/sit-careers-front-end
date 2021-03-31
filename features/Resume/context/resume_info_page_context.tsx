import { makeAutoObservable } from 'mobx'

import { createContext } from 'react'
import apiResume from '../services/apiResume'
import Router from 'next/router'

export class ResumeInfoPageContext {
  modal
  resume
  renderDelay

  constructor() {
    this.modal = ''
    this.resume = ''
    this.renderDelay = true

    makeAutoObservable(this)
  }

  keyChange = (key, value) => {
    this[key] = value
  }

  getResumeById = async (resumeId) => {
    try {
      const response = await apiResume.getResumeById(resumeId)
      this.resume = response.data
    } catch (error) {
      console.log(error)
    }
  }

  getResumeByUserId = async () => {
    try {
      const response = await apiResume.getResumeByUserId()
      this.resume = response.data[0]
    } catch (error) {
      console.log(error)
    }
  }

  updateResume = async (data) => {
    try {
      await apiResume.updateResume(data).then(() => {
        this.modal.closeModal()
        Router.reload()
      })
    } catch (error) {
      console.log(error)
    }
  }

  createResume = async (data) => {
    try {
      await apiResume.createResume(data).then(() => {
        this.modal.closeModal()
        Router.reload()
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const resumeInfoPageContext = createContext(new ResumeInfoPageContext())
