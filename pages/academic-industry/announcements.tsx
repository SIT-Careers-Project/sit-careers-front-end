import AnnouncementSearch from '../../features/Academic-Industry/pages/announcement-search'
import { MainLayout } from '../../core/components/Layout/Main'
import React from 'react'

const Announcements = ({ authContext }) => {
  return (
    <MainLayout authContext={authContext}>
      <div>
        <AnnouncementSearch />
      </div>
    </MainLayout>
  )
}

export default Announcements
