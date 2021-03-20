import Application from '../../../features/Academic-Industry/pages/application-history'
import { MainLayout } from '../../../core/components/Layout/Main'
import React, { useEffect } from 'react'
import Router from 'next/router'
import { checkLoggedIn } from 'core/services/utils'

const ApplicationHistory = ({ authContext }) => {
  useEffect(() => {
    authContext.fetchMe().then(() => {
      const path = checkLoggedIn(
        authContext.isLoggedIn,
        ['admin', 'manager', 'coordinator', 'student'],
        authContext.roleUser
      )
      Router.replace(path)
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
