import React, { useContext, useEffect } from 'react'
import { Assignment, Domain, People } from '@material-ui/icons'
import { StatCard } from '../../../../core/components/Card/StatCard'
import { dashboardPageContext } from '../../context/dashboard_page_context'
import { Observer } from 'mobx-react-lite'

export const StatCardSection = () => {
  const context = useContext(dashboardPageContext)

  useEffect(() => {
    context.getStat()
  }, [context])

  return (
    <Observer>
      {() => (
        <div
          className="absolute bottom-0 w-full bg-fixed bg-grey-fbfcfd -mb-40"
          style={{
            background: 'url(/image/bg_wave.svg)',
            height: '900px',
            width: '100vw',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}>
          <div className="h-full max-w-screen-lg mx-auto">
            <div className="max-w-screen-lg mx-auto pt-64">
              <div className="grid grid-cols-12 gap-5 pt-40">
                <div className="col-span-12">
                  <p className="text-center text-primary text-heading-3 font-prompt-medium text-primary">
                    SIT Career Center
                  </p>
                </div>
                <div className="col-span-4">
                  <StatCard
                    title="บริษัททั้งหมด"
                    stat={context.statInfo.count_all_companies}
                    icon={<Domain style={{ color: 'white', fontSize: '87px' }} />}
                  />
                </div>
                <div className="col-span-4">
                  <StatCard
                    title="ประการรับสมัครงาน"
                    stat={context.statInfo.count_all_announcements}
                    icon={<Assignment style={{ color: 'white', fontSize: '87px' }} />}
                  />
                </div>
                <div className="col-span-4">
                  <StatCard
                    title="ผู้เข้าใช้งานทั้งหมด"
                    stat={context.statInfo.count_all_users}
                    icon={<People style={{ color: 'white', fontSize: '87px' }} />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  )
}
