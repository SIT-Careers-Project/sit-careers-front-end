import AnnouncementPage from 'features/Academic-Industry/pages/announcement-update'
import { MainLayout } from 'core/components/Layout/Main'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { checkLoggedIn } from 'core/services/utils'
import { Alert } from 'core/components/Alert'

const UpdateAnnouncement = ({ authContext }) => {
  const router = useRouter()

  useEffect(() => {
    authContext.fetchMe().then(() => {
      const path = checkLoggedIn(
        authContext.isLoggedIn,
        ['admin', 'manager', 'coordinator', 'viewer'],
        authContext.roleUser
      )
      path && router.push(path)
    })
  }, [authContext, router])

  return (
    <MainLayout authContext={authContext}>
      <div className="flex flex-col items-center justify-center mt-16 ">
        <Alert />
        <AnnouncementPage authContext={authContext} />
      </div>
    </MainLayout>
  )
}

export default UpdateAnnouncement
