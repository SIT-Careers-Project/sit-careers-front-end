import React from 'react'
import { Assignment, Domain, People } from '@material-ui/icons'
import { StatCard } from '../../../../core/components/Card/StatCard'

export const StatCardSection = () => {
  return (
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
              <p className="text-center text-primary text-heading-5">
                SIT Industry Collaboration Service System
              </p>
            </div>
            <div className="col-span-4">
              <StatCard
                title="บริษัททั้งหมด"
                stat={385}
                icon={<Domain style={{ color: 'white', fontSize: '87px' }} />}
              />
            </div>
            <div className="col-span-4">
              <StatCard
                title="ประการรับสมัครงาน"
                stat={128}
                icon={<Assignment style={{ color: 'white', fontSize: '87px' }} />}
              />
            </div>
            <div className="col-span-4">
              <StatCard
                title="ผู้เข้าใช้งานทั้งหมด"
                stat={3442}
                icon={<People style={{ color: 'white', fontSize: '87px' }} />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
