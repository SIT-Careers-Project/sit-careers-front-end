import Application from '../../../features/Academic-Industry/pages/application-history'
import { MainLayout } from '../../../core/components/Layout/Main'
import React from 'react'

const ApplicationHistory = ({ authContext }) => {
  return (
    <MainLayout authContext={authContext}>
      <div className="flex justify-center mt-16 ">
        <Application />
      </div>
    </MainLayout>
  )
}

export default ApplicationHistory
