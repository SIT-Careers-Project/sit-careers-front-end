import { makeAutoObservable } from 'mobx'
import { apiAuth } from '../services/apiAuth'
import { createContext } from 'react'
import Cookies from 'js-cookie'
import Router from 'next/router'

export class authContext {
  user
  permission
  token
  isLoggedIn

  constructor() {
    this.user = ''
    this.permission = ''
    this.token = ''
    this.isLoggedIn = false

    makeAutoObservable(this)
  }

  login = async (data) => {
    try {
      const response = await apiAuth.login(data)
      if (response?.status === 200) {
        Cookies.set('token', response.data.token)
        this.isLoggedIn = true
        Router.push('/')
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert(error.response?.data?.message)
      } else {
        alert(`เกิดข้อผิดพลาด status code ${error.response?.status}`)
      }
      this.isLoggedIn = false
    }
  }

  fetchMe = async () => {
    try {
      if (Cookies.get('token')) {
        const response = await apiAuth.me()
        if (response?.status === 200) {
          this.isLoggedIn = true
          this.permission = response.data.permission
        }
      }
    } catch (error) {
      alert(`เกิดข้อผิดพลาด status code ${error.response?.status}`)
      this.isLoggedIn = false
    }
  }

  logout = () => {
    this.isLoggedIn = false
    Cookies.remove('token')
    Cookies.remove('permission')
    Router.push('/')
  }
}

export const AuthContext = createContext(new authContext())
