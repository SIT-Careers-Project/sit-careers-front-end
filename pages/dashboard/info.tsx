import Dashboard from '../../features/Dashboard/pages/info'
import { MainLayout } from '../../core/components/Layout/Main'
import React from 'react'

const DashboardInfo = ({ authContext }) => {
  return (
    <MainLayout authContext={authContext}>
      <div>
        <Dashboard />
      </div>
    </MainLayout>
  )
}

export default DashboardInfo
