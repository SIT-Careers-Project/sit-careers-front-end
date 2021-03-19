import Application from '../../../features/Academic-Industry/pages/application-history'
import { MainLayout } from '../../../core/components/Layout/Main'
import React, { useEffect } from 'react'
import _ from 'lodash'
import Router from 'next/router'

const ApplicationHistory = ({ authContext }) => {
  useEffect(() => {
    authContext.fetchMe().then(() => {
      const checkRole = _.includes(
        ['admin', 'manager', 'coordinator', 'student'],
        authContext.roleUser
      )
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
        <Application />
      </div>
    </MainLayout>
  )
}

export default ApplicationHistory
