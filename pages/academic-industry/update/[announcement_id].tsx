import AnnouncementPage from '../../../features/Academic-Industry/pages/announcement_update'
import { MainLayout } from '../../../core/components/Layout/Main'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { checkLoggedIn } from 'core/services/utils'

const UpdateAnnouncement = ({ authContext }) => {
  const router = useRouter()

  useEffect(() => {
    authContext.fetchMe().then(() => {
      const path = checkLoggedIn(
        authContext.isLoggedIn,
        ['admin', 'manager', 'coordinator'],
        authContext.roleUser
      )
      path && router.push(path)
    })
  }, [authContext, router])

  return (
    <MainLayout authContext={authContext}>
      <div className="flex justify-center mt-16 ">
        <AnnouncementPage authContext={authContext} />
      </div>
    </MainLayout>
  )
}

export default UpdateAnnouncement
