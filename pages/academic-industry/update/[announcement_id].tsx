import AnnouncementPage from '../../../features/Academic-Industry/pages/announcement_update'
import { MainLayout } from '../../../core/components/Layout/Main'
import React from 'react'

const UpdateCompany = () => {
  return (
    <MainLayout>
      <div className="flex justify-center mt-16 ">
        <AnnouncementPage />
      </div>
    </MainLayout>
  )
}

export default UpdateCompany
