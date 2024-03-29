import React, { useContext, useEffect } from 'react'
import { Observer } from 'mobx-react-lite'
import Link from 'next/link'
import dayjs from 'dayjs'

import { AddCircle } from '@material-ui/icons'
import { CircularProgress } from '@material-ui/core'
import { Announcement } from '../components/Announcement'
import { checkStatus } from '../../../core/services/utils'
import Pagination from '../../../core/components/Pagination'
import Search from '../../../core/components/Search'
import { announcementInfoContext } from '../context/announcement_info_context'
import { searchContext } from '../../../core/contexts/search_context'
import { paginationContext } from '../../../core/contexts/pagination_context'
import { AlertContext } from 'core/contexts/alert_context'

const AnnouncementInfo = ({ authContext }) => {
  const contextInfo = useContext(announcementInfoContext)
  const contextSearch = useContext(searchContext)
  const alertContext = useContext(AlertContext)
  const contextPagination = useContext(paginationContext)

  useEffect(() => {
    contextInfo.keyChange('alert', alertContext)
    if (authContext.roleUser === 'admin' || authContext.roleUser === 'viewer') {
      contextInfo.getAnnouncements()
    } else if (authContext.roleUser === 'manager' || authContext.roleUser === 'coordinator') {
      contextInfo.getAnnouncementByCompany()
    }
    contextPagination.setSliceData()
  }, [authContext.roleUser, contextInfo, contextPagination])

  return (
    <Observer>
      {() => (
        <div className="w-full h-full max-w-screen-lg">
          <div className="flex justify-between w-full mt-2">
            <div>
              <p className="text-heading-5 font-prompt">ลงประกาศรับสมัครงาน</p>
            </div>
            {(authContext.roleUser === 'admin' ||
              authContext.roleUser === 'manager' ||
              authContext.roleUser === 'coordinator') && (
              <div>
                <Link href="/academic-industry/form-create">
                  <button className="bg-primary focus:outline-none">
                    <p className="px-5 py-2 text-white font-prompt text-subtitle-1">
                      <AddCircle className="mr-1" />
                      สร้างประกาศ
                    </p>
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="w-full h-1 mt-5 mb-5 bg-secondary1" />
          <div className="w-full h-8 bg-grey-100">
            <Search
              onChange={(event) => {
                if (typeof event.target.value === 'string') {
                  const keySearch = [
                    'announcement_title',
                    'company_name_en',
                    'company_name_th',
                    'job_position',
                    'job_type',
                    'start_date',
                    'end_date'
                  ]
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
                {contextInfo.announcements
                  .slice(contextPagination.sliceDataStart, contextPagination.sliceDataEnd)
                  .map((data, i) => {
                    const startDate = dayjs(data?.start_date)
                      .locale('th')
                      .format('DD MMMM YYYY hh:mm')
                    const endDate = dayjs(data?.end_date).locale('th').format('DD MMMM YYYY hh:mm')
                    const status = checkStatus(data?.start_date, data?.end_date, data?.status)

                    return (
                      <div className="pt-5" key={`announcement_card_${i}`}>
                        <Announcement
                          title={data?.announcement_title}
                          tags={[data?.job_position]}
                          jobType={data?.job_type}
                          status={status}
                          date={`${startDate} - ${endDate}`}
                          company={`${data?.company_name_th} - ${data?.company_name_en}`}
                          srcImg={data?.logo}
                          linkPath={`/academic-industry/update/${data?.announcement_id}`}
                        />
                      </div>
                    )
                  })}
                <Pagination data={contextInfo.announcements} />
              </>
            ) : (
              <>
                {contextInfo.isLoading ? (
                  <div className="flex justify-center">
                    <CircularProgress disableShrink className="mt-32" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-16">
                    <span className="font-prompt text-heading-6">ไม่พบผลลัพธ์</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </Observer>
  )
}

export default AnnouncementInfo
