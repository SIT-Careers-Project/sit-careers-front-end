import React, { useContext, useEffect } from 'react'
import { Assignment, Domain, People } from '@material-ui/icons'
import { Observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

import { AnnouncementSection } from '../components/Sections/Announcement'
import { Carousel } from '../components/Carousel'
import { CompanySection } from '../components/Sections/Company'
import { StatCard } from '../../../core/components/Card/StatCard'
import { AuthContext } from '../../../core/contexts/auth_context'
import { homePageContext } from '../contexts/homepage_context'
import { AlertContext } from 'core/contexts/alert_context'
import { Alert } from 'core/components/Alert'

function Index() {
  const router = useRouter()
  const authContext = useContext(AuthContext)
  const alertContext = useContext(AlertContext)
  const { code, state } = router.query
  const context = useContext(homePageContext)

  useEffect(() => {
    context.getStat()
    authContext.changeKey('alert', alertContext)
    if (code && state) {
      authContext.SITLogin(code, state)
    }
  }, [authContext, code, context, state])

  return (
    <Observer>
      {() => (
        <>
          <Carousel />
          <div className="hidden">
            <Alert />
          </div>
          <div className="max-w-screen-lg mx-auto">
            <div className="grid grid-cols-12 gap-5 py-24">
              <div className="col-span-12">
                <p className="text-center text-primary text-heading-3 font-prompt-medium">
                  SIT Career Center
                </p>
              </div>
              <div className="col-span-4">
                <StatCard
                  isLoading={context.isLoading}
                  title="บริษัททั้งหมด"
                  stat={context?.statInfo?.count_all_companies}
                  icon={<Domain style={{ color: 'white', fontSize: '87px' }} />}
                />
              </div>
              <div className="col-span-4">
                <StatCard
                  isLoading={context.isLoading}
                  title="ประกาศรับสมัคร"
                  stat={context.statInfo.count_all_announcements}
                  icon={<Assignment style={{ color: 'white', fontSize: '87px' }} />}
                />
              </div>
              <div className="col-span-4">
                <StatCard
                  isLoading={context.isLoading}
                  title="ผู้เข้าใช้งาน"
                  stat={context.statInfo.count_all_users}
                  icon={<People style={{ color: 'white', fontSize: '87px' }} />}
                />
              </div>
            </div>
          </div>
          <div style={{ height: '1400px' }} className="relative overflow-hidden bg-grey-fbfcfd">
            <AnnouncementSection />
            <CompanySection />
          </div>
        </>
      )}
    </Observer>
  )
}

export default Index
