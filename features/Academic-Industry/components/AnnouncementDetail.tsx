/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import getConfig from 'next/config'
import {
  Assignment,
  AttachMoney,
  Business,
  CheckBox,
  FreeBreakfast,
  QueryBuilder
} from '@material-ui/icons'
import dayjs from 'dayjs'
import { Card as MaterialCard, Typography } from '@material-ui/core'
import Link from 'next/link'
import { TagStatus } from 'core/components/TagStatus'
import { checkStatus } from '../../../core/services/utils'
const { publicRuntimeConfig } = getConfig()

interface AnnouncementDetailProps {
  data: any
}

export const AnnouncementDetail = ({ data }: AnnouncementDetailProps) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [data])
  return (
    <div className="w-full ml-5 mr-auto md:w-5/12">
      <div>
        <MaterialCard style={{ height: '1100px', width: '562px' }}>
          <div className="flex items-end justify-end w-full h-40 rounded-none bg-grey-100">
            {data?.picture !== '-' && (
              <img
                alt="Announcement Banner"
                src={`${publicRuntimeConfig.s3_url}/cover_announcement/${data?.picture}`}
              />
            )}
            {data.picture === '-' && (
              <div className="flex items-center justify-center w-full h-full bg-secondary1">
                <span className="text-white text-heading-1">
                  {data.company_name_en.substr(0, 1)}
                </span>
              </div>
            )}
          </div>
          <div className="p-5 align-middle">
            <div className="flex flex-row">
              <div className="w-3/4">
                <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
                  {data?.announcement_title}
                </Typography>
                <TagStatus status={checkStatus(data?.start_date, data?.end_date, data?.status)} />
                {[`${data?.job_type}`, `${data?.job_position}`].map((item, i) => (
                  <span
                    key={i}
                    className="px-1 mr-2 text-sm text-white rounded font-prompt text-body-2 bg-primary">
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex justify-end w-1/4 h-12 grid-cols-12">
                {checkStatus(data?.start_date, data?.end_date, data?.status) === 'OPEN' && (
                  <Link href="/academic-industry/form-application">
                    <button className="text-white cursor-pointer bg-primary">
                      <p className="px-5 py-3 text-white font-prompt text-subtitle-1">สมัคร</p>
                    </button>
                  </Link>
                )}
                {checkStatus(data?.start_date, data?.end_date, data?.status) === 'CLOSE' && (
                  <button className="text-white bg-opacity-50 bg-primary" disabled>
                    <p className="px-5 py-3 text-white cursor-default font-prompt text-subtitle-1">
                      สมัคร
                    </p>
                  </button>
                )}
              </div>
            </div>
            <div className="w-full h-1 mt-4 mb-3 bg-secondary1" />
            <div className="w-3/4">
              <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
                <QueryBuilder className="mb-2 mr-2" />
                <span>
                  {dayjs(data?.start_date).locale('th').add(543, 'year').format('DD MMMM')} -{' '}
                  {dayjs(data?.end_date).locale('th').add(543, 'year').format('DD MMMM YYYY')}
                </span>
              </Typography>
              <div className="pt-2 pb-2">
                <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
                  <Assignment className="mb-2 mr-2" />
                  รายละเอียดงาน
                </Typography>
                <Typography className="mb-3 ml-1 font-bold text-black font-prompt text-heading-6">
                  {data?.job_description}
                </Typography>
              </div>
              <div className="pt-2 pb-2">
                <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
                  <CheckBox className="mb-2 mr-2" />
                  คุณสมบัติ
                </Typography>
                <Typography className="mb-3 ml-1 font-bold text-blackfont-prompt text-heading-6">
                  {data?.property}
                </Typography>
              </div>
              <div className="pt-2 pb-2">
                <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
                  <AttachMoney className="mb-2 mr-2" />
                  เงินเดือน
                </Typography>
                <Typography className="mb-3 ml-1 font-bold text-black font-prompt text-heading-6">
                  {data?.salary}
                </Typography>
              </div>
              <div className="pt-2 pb-2">
                <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
                  <FreeBreakfast className="mb-2 mr-2" />
                  สวัสดิการ
                </Typography>
                <Typography className="mb-3 ml-1 font-bold text-black font-prompt text-heading-6">
                  {data?.welfare}
                </Typography>
              </div>
              <div className="pt-2 pb-2">
                <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
                  <Business className="mb-2 mr-2" />
                  สถานที่ปฏิบัติงาน
                </Typography>
                <Typography className="mb-3 ml-1 font-bold text-black font-prompt text-heading-6">
                  {data?.company_name_th} {data?.address_one} {data?.lane} {data?.road}
                  {data?.district} {data?.sub_district}
                  {data?.province} {data?.postal_code}
                </Typography>
              </div>
              <div className="pt-2 pb-2">
                <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
                  <QueryBuilder className="mb-2 mr-2" />
                  วันที่ทำการ
                </Typography>
                <Typography className="mb-3 ml-1 font-bold text-black font-prompt text-heading-6">
                  {data?.start_business_day} - {data?.end_business_day} เวลา{' '}
                  {data?.start_business_time} - {data?.end_business_time} น.
                </Typography>
              </div>
            </div>
          </div>
        </MaterialCard>
      </div>
    </div>
  )
}
