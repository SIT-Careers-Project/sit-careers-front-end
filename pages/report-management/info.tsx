import Report from '../../features/Report-Management/pages/report-info'
import { MainLayout } from '../../core/components/Layout/Main'
import React from 'react'

const ReportInfo = ({ authContext }) => {
  return (
    <MainLayout authContext={authContext}>
      <div className="flex justify-center mt-16">
        <Report />
      </div>
    </MainLayout>
  )
}

export default ReportInfo
