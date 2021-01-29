import AnnouncementSearch from '../../features/Academic-Industry/pages/announcement-search'
import { MainLayout } from '../../core/components/Layout/Main'
import React from 'react'

const Announcements = () => {
  return (
    <MainLayout>
      <div>
        <AnnouncementSearch />
      </div>
    </MainLayout>
  )
}

export default Announcements
