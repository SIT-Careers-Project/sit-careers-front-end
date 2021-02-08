import { Assignment, Domain, People } from '@material-ui/icons'

import { AnnouncementSection } from '../components/Sections/Announcement'
import { CompanySection } from '../components/Sections/Company'
import { StatCard } from '../../../core/components/Card/StatCard'

function Index() {
  return (
    <>
      <div style={{ height: '450px' }} className="w-full mt-12 bg-primary"></div>
      <div className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-12 gap-5 py-24">
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
              title="บริษัททั้งหมด"
              stat={3442}
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
  )
}

export default Index
