import ApplicationForm from '../../../../features/Academic-Industry/pages/announcement-application'
import { MainLayout } from '../../../../core/components/Layout/Main'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { checkLoggedIn } from 'core/services/utils'
import { Alert } from 'core/components/Alert'

const CreateApplication = ({ authContext }) => {
  const router = useRouter()

  useEffect(() => {
    authContext.fetchMe().then(() => {
      const path = checkLoggedIn(authContext.isLoggedIn, ['student'], authContext.roleUser)
      path && router.push(path)
    })
  }, [authContext, router])

  return (
    <MainLayout authContext={authContext}>
      <div className="flex flex-col items-center mt-16">
        <Alert />
        <ApplicationForm />
      </div>
    </MainLayout>
  )
}

export default CreateApplication
