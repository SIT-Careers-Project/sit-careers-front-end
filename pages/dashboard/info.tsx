import Dashboard from '../../features/Dashboard/pages/info'
import { MainLayout } from '../../core/components/Layout/Main'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const DashboardInfo = ({ authContext }) => {
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
        <Dashboard />
      </div>
    </MainLayout>
  )
}

export default DashboardInfo
