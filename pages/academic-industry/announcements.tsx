import AnnouncementSearch from '../../features/Academic-Industry/pages/announcement-search'
import { MainLayout } from '../../core/components/Layout/Main'
import React, { useEffect } from 'react'
import Router from 'next/router'

const Announcements = ({ authContext }) => {
  useEffect(() => {
    authContext.fetchMe().then(() => {
      if (!authContext.isLoggedIn) {
        Router.replace('/login')
      }
    })
  }, [authContext])

  return (
    <MainLayout authContext={authContext}>
      <div>
        <AnnouncementSearch />
      </div>
    </MainLayout>
  )
}

export default Announcements
