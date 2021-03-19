import UserInfo from '../../features/User-Management/pages/user-info'
import { MainLayout } from '../../core/components/Layout/Main'
import React, { useEffect } from 'react'
import _ from 'lodash'
import Router from 'next/router'

const CompanyInfo = ({ authContext }) => {
  useEffect(() => {
    authContext.fetchMe().then(() => {
      const checkRole = _.includes(['admin'], authContext.roleUser)
      if (authContext.isLoggedIn) {
        if (!checkRole) {
          Router.replace('/401')
        }
      } else {
        Router.replace('/login')
      }
    })
  }, [authContext])

  return (
    <MainLayout authContext={authContext}>
      <div className="flex justify-center mt-16 ">
        <UserInfo />
      </div>
    </MainLayout>
  )
}

export default CompanyInfo
