import AnnouncementForm from '../../../features/Academic-Industry/pages/announcement-status-info'
import { MainLayout } from 'core/components/Layout/Main'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { checkLoggedIn } from 'core/services/utils'
import { Alert } from 'core/components/Alert'

const UpdateCompany = ({ authContext }) => {
  const router = useRouter()

  useEffect(() => {
    authContext.fetchMe().then(() => {
      const path = checkLoggedIn(
        authContext.isLoggedIn,
        ['admin', 'manager', 'coordinator', 'student', 'viewer'],
        authContext.roleUser
      )
      path && router.push(path)
    })
  }, [authContext, router])

  return (
    <MainLayout authContext={authContext}>
      <div className="flex justify-center mt-16">
        <Alert />
        <AnnouncementForm authContext={authContext} />
      </div>
    </MainLayout>
  )
}

export default UpdateCompany
