import React from 'react'
import { NotAuthorized } from '../core/components/ErrorPage/NotAuthorized'
import { MainLayout } from '../core/components/Layout/Main'

const NotAuthorizedPage = ({ authContext }) => {
  return (
    <MainLayout authContext={authContext}>
      <NotAuthorized />
    </MainLayout>
  )
}

export default NotAuthorizedPage
