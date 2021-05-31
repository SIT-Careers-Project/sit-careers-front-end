import AnnouncementSearch from '../../features/Academic-Industry/pages/announcement-search'
import { MainLayout } from '../../core/components/Layout/Main'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

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
        <AnnouncementSearch />
      </div>
    </MainLayout>
  )
}

export default Announcements
