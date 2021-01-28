import React, { useContext } from 'react'
import { useObserver } from 'mobx-react-lite'
import { Announcement } from '../components/Announcement'
import { AddCircle } from '@material-ui/icons'
import Link from 'next/link'
import Search from '../../../core/components/Search'
import { announcementDuplicateFormContext } from '../context/announcement_duplicate_form_context'

const CompanyInfo = () => {
  const context = useContext(announcementDuplicateFormContext)

  return useObserver(() => (
    <div className="w-full h-full max-w-screen-lg mb-16">
      <div className="flex justify-between w-full mt-2">
        <div>
          <p className="text-heading-5 font-prompt">ลงประกาศรับสมัครงาน</p>
        </div>
        <div>
          <Link href="/academic-industry/form-create">
            <button className="bg-primary">
              <p className="px-5 py-2 text-white font-prompt text-subtitle-1">
                <AddCircle className="mr-1" />
                สร้างประกาศ
              </p>
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full h-1 mt-5 mb-5 bg-secondary1" />
      <div className="w-full h-8 bg-grey-100">
        <Search />
      </div>
      <div className="pt-5">
        <Announcement
          title="รับสมัครงานตำแหน่ง Software Engineer"
          tags={['Software Engineer', 'WiL']}
          date="12 มีนาคม - 24 ธันวาคม 2563"
          company="SIT Company"
          srcImg="https://avatars0.githubusercontent.com/u/22110844?s=280&v=4"
          context={context}
        />
      </div>
    </div>
  ))
}

export default CompanyInfo
