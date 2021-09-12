import AnnouncementSearch from '../../../features/Academic-Industry/pages/announcement-search'
import { MainLayout } from '../../../core/components/Layout/Main'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Alert } from 'core/components/Alert'

const Announcements = ({ authContext, announcement_id }) => {
  const router = useRouter()
  useEffect(() => {
    authContext.fetchMe().then(() => {
      if (!authContext.isLoggedIn) {
        router.push('/login')
      }
    })
  }, [authContext, router])

  return (
    <MainLayout authContext={authContext}>
      <div className="flex flex-col items-center justify-center">
        <Alert />
        <AnnouncementSearch authContext={authContext} announcementId={announcement_id} />
      </div>
    </MainLayout>
  )
}

Announcements.getInitialProps = (context) => {
  const announcementId = context.query.announcement_id

  return {
    announcement_id: announcementId
  }
}

export default Announcements
