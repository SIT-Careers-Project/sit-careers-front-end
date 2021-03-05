import UserInfo from '../../features/User-Management/pages/user-info'
import { MainLayout } from '../../core/components/Layout/Main'
import React from 'react'

const CompanyInfo = ({ authContext }) => {
  return (
    <MainLayout authContext={authContext}>
      <div className="flex justify-center mt-16 ">
        <UserInfo />
      </div>
    </MainLayout>
  )
}

export default CompanyInfo
