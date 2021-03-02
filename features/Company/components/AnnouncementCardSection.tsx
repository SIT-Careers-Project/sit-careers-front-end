import React, { useEffect } from 'react'

import { CardSmall } from '../../../core/components/Card/Small'
import { checkStatus } from '../../../core/services/utils'
import dayjs from 'dayjs'

export const AnnouncementCardSection = (props) => {
  const { announcements } = props

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [announcements])

  return (
    <>
      {announcements.length !== 0 && (
        <div className="flex flex-col">
          <p className="font-prompt-semibold text-body-1">ประกาศรับสมัครงาน</p>
          <div id="scrollbar-custom" className="flex flex-row w-full overflow-x-scroll">
            <div className="flex flex-row gap-5 my-4">
              {announcements.map((data, i) => {
                return (
                  <div style={{ width: '403px', height: '201px' }} key={i}>
                    <CardSmall
                      company={`${data.company_name_en}`}
                      title={data.announcement_title}
                      date={`${dayjs(data.start_date)
                        .locale('th')
                        .add(543, 'year')
                        .format('DD MMMM')} - ${dayjs(data.end_date)
                        .locale('th')
                        .add(543, 'year')
                        .format('DD MMMM YYYY')}`}
                      status={checkStatus(data.start_date, data.end_date, data.status)}
                      tags={[`${data.job_position}`, `${data.job_type}`]}
                      srcImg={data.logo}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
