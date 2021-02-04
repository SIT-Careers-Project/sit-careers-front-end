import React, { useContext, useEffect } from 'react'
import { useObserver } from 'mobx-react-lite'
import { Announcement } from '../components/Announcement'
import { AddCircle } from '@material-ui/icons'
import Link from 'next/link'
import Search from '../../../core/components/Search'
import { announcementDuplicateFormContext } from '../context/announcement_duplicate_form_context'
import { announcementInfoContext } from '../context/announcement_info_context'
import { searchContext } from '../../../core/contexts/search_context'
import Pagination from '../../../core/components/Pagination'

const CompanyInfo = () => {
  const context = useContext(announcementDuplicateFormContext)
  const contextInfo = useContext(announcementInfoContext)
  const contextSearch = useContext(searchContext)

  useEffect(() => {
    contextInfo.getAnnouncements()
  }, [contextInfo])

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
        <Search
          onChange={(event) => {
            if (typeof event.target.value === 'string') {
              const keySearch = ['announcement_title', 'company_name_en', 'company_name_th']
              contextInfo.setAnnouncements(
                contextSearch.setSearchItems(
                  [event.target.value],
                  contextInfo.beforeSearch,
                  keySearch
                )
              )
            }
          }}
        />
      </div>
      <div>
        {contextInfo.announcements.length !== 0 ? (
          <>
            {contextInfo.announcements.map((data, i) => {
              return (
                <div className="pt-5" key={i}>
                  <Announcement
                    title={data.announcement_title}
                    tags={[data.job_position, data.job_type, data.status]}
                    date={`${data.start_date} - ${data.end_date}`}
                    srcImg="https://i.picsum.photos/id/1000/5626/3635.jpg?hmac=qWh065Fr_M8Oa3sNsdDL8ngWXv2Jb-EE49ZIn6c0P-g"
                    context={context}
                  />
                </div>
              )
            })}
            <Pagination data={contextInfo.announcements} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-16">
            <span className="font-prompt text-heading-6">ไม่พบผลลัพธ์</span>
          </div>
        )}
      </div>
    </div>
  ))
}

export default CompanyInfo
