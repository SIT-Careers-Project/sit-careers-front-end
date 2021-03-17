import AnnouncementPage from '../../../features/Academic-Industry/pages/announcement_update'
import { MainLayout } from '../../../core/components/Layout/Main'
import React from 'react'

const UpdateCompany = ({ authContext }) => {
  return (
    <MainLayout authContext={authContext}>
      <div className="flex justify-center mt-16 ">
        <AnnouncementPage />
      </div>
    </MainLayout>
  )
}

export default UpdateCompany
