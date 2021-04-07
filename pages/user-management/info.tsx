import UserInfo from '../../features/User-Management/pages/user-info'
import { MainLayout } from '../../core/components/Layout/Main'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { checkLoggedIn } from 'core/services/utils'

const CompanyInfo = ({ authContext }) => {
  const router = useRouter()
  useEffect(() => {
    authContext.fetchMe().then(() => {
      const path = checkLoggedIn(authContext.isLoggedIn, ['admin', 'manager'], authContext.roleUser)
      path && router.push(path)
    })
  }, [authContext, router])

  return (
    <MainLayout authContext={authContext}>
      <div className="flex justify-center mt-16 ">
        <UserInfo authContext={authContext} />
      </div>
    </MainLayout>
  )
}

export default CompanyInfo
