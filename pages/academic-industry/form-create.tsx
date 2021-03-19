import FormCreate from '../../features/Academic-Industry/pages/announcement-form'
import { MainLayout } from '../../core/components/Layout/Main'
import React, { useEffect } from 'react'
import _ from 'lodash'
import Router from 'next/router'

const AnnouncementForm = ({ authContext }) => {
  useEffect(() => {
    authContext.fetchMe().then(() => {
      const checkRole = _.includes(['admin', 'manager', 'coordinator'], authContext.roleUser)
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
      <div className="flex justify-center mt-16">
        <FormCreate />
      </div>
    </MainLayout>
  )
}

export default AnnouncementForm
