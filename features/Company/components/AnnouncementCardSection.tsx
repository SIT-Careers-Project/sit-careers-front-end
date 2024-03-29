/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import _ from 'lodash'

import { CardSmall } from '../../../core/components/Card/Small'
import { checkStatus } from '../../../core/services/utils'
import { ArrowForwardIosOutlined, ArrowBackIosOutlined } from '@material-ui/icons'
import { useRouter } from 'next/router'

export const AnnouncementCardSection = (props) => {
  const { announcements } = props
  const router = useRouter()
  const [index, setIndex] = useState(0)

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [announcements])

  const nextImage = () => {
    if (index <= announcements.length - 4) {
      setIndex((preState) => preState + 1)
    }
  }

  const previousImage = () => {
    if (index > 0) {
      setIndex((preState) => preState - 1)
    }
  }

  return (
    <>
      {announcements.length !== 0 && (
        <div className="flex flex-col">
          <p className="font-prompt-semibold text-body-1">ประกาศรับสมัครงาน</p>
          <div
            style={{ height: '301px' }}
            className="relative flex flex-row items-center w-full overflow-x-hidden">
            <div className="absolute top-0 right-0 z-10 flex items-center justify-end flex-1 w-12 h-full bg-grey-fbfcfd">
              <button
                className="focus:outline-none"
                onClick={() => nextImage()}
                disabled={announcements.length - 2 < -2}>
                <div className="flex items-center justify-center w-8 h-8 border-2 rounded-full text-primary border-primary">
                  <ArrowForwardIosOutlined fontSize="small" />
                </div>
              </button>
            </div>

            <div
              style={{ transform: `translate3d(${-index * (100 / 2.2)}%, 0, 0)` }}
              className="z-0 flex flex-row flex-1 pl-12 space-x-6 transition duration-1000 ease-in whitespace-nowrap">
              {_.map(announcements, (data, i) => {
                return (
                  <div
                    key={`card_announcement_${i}`}
                    className="inline-block"
                    style={{ width: '403px', height: '201px' }}>
                    <button className="text-left focus:outline-none">
                      <CardSmall
                        company={`${data.company_name_en}`}
                        title={data.announcement_title}
                        onClick={() =>
                          router.push(`/academic-industry/announcements/${data.announcement_id}`)
                        }
                        date={`${dayjs(data.start_date)
                          .locale('th')
                          .add(543, 'year')
                          .format('DD MMMM')} - ${dayjs(data.end_date)
                          .locale('th')
                          .add(543, 'year')
                          .format('DD MMMM YYYY')}`}
                        status={checkStatus(data.start_date, data.end_date, data.status)}
                        tags={[`${data.job_position}`]}
                        srcImg={data.logo}
                      />
                    </button>
                  </div>
                )
              })}
            </div>
            <div className="absolute top-0 z-10 flex items-center flex-1 w-12 h-full bg-grey-fbfcfd">
              <button
                className="focus:outline-none"
                onClick={() => previousImage()}
                disabled={announcements.length - 2 < -2}>
                <div className="flex items-center justify-center w-8 h-8 border-2 rounded-full text-primary border-primary">
                  <ArrowBackIosOutlined fontSize="small" />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
