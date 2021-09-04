import AnnouncementSearch from '../../features/Academic-Industry/pages/announcement-search'
import { MainLayout } from '../../core/components/Layout/Main'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Alert } from 'core/components/Alert'

const Announcements = ({ authContext }) => {
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
      <div>
        <Alert />
        <AnnouncementSearch authContext={authContext} />
      </div>
    </MainLayout>
  )
}

export default Announcements
