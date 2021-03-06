/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import getConfig from 'next/config'
import {
  Assignment,
  AttachMoney,
  Business,
  CheckBox,
  FreeBreakfast,
  QueryBuilder,
  Launch
} from '@material-ui/icons'
import dayjs from 'dayjs'
import { Card as MaterialCard, Typography } from '@material-ui/core'
import Link from 'next/link'
import { TagStatus } from 'core/components/TagStatus'
import { checkStatus } from '../../../core/services/utils'
import _ from 'lodash'

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
        <MaterialCard
          style={{
            height: '1100px',
            width: '562px',
            boxShadow: '10px -3px 15px rgba(0, 0, 0, 0.10), 4px -2px 6px rgba(0, 0, 0, 0.05)'
          }}>
          <div className="flex items-end justify-end w-full h-40 rounded-none bg-grey-100">
            {data?.picture !== '-' && (
              <img
                alt="Announcement Banner"
                src={`${publicRuntimeConfig.s3_url}/cover_announcement/${data?.picture}`}
              />
            )}
            {data?.picture === '-' && (
              <div className="flex items-center justify-center w-full h-full bg-secondary1">
                <span className="text-white text-heading-1">
                  {data?.company_name_en.substr(0, 1)}
                </span>
              </div>
            )}
          </div>
          <div className="p-5 align-middle">
            <div className="flex flex-row">
              <div className="w-3/4">
                <div className="mb-2 font-bold text-primary font-sarabun text-subtitle-1">
                  {data?.announcement_title}
                </div>
                <TagStatus status={checkStatus(data?.start_date, data?.end_date, data?.status)} />
                {[`${data?.job_position}`].map((item, i) => (
                  <span
                    key={i}
                    className="px-1 mr-2 text-sm text-white rounded font-prompt text-body-2 bg-primary">
                    {item}
                  </span>
                ))}
                <div>
                  <Typography className="pt-2 ml-1 font-bold text-red font-prompt text-heading-6">
                    <QueryBuilder className="mb-2 mr-2" />
                    <span>
                      {dayjs(data?.start_date)
                        .locale('th')
                        .add(543, 'year')
                        .format('DD/MM/YYYY h:mm A - ')}
                      {dayjs(data?.end_date)
                        .locale('th')
                        .add(543, 'year')
                        .format('DD/MM/YYYY h:mm A')}
                    </span>
                  </Typography>
                </div>
              </div>
              <div className="flex justify-end w-1/4 h-12 grid-cols-12">
                {checkStatus(data?.start_date, data?.end_date, data?.status) === 'OPEN' && (
                  <Link href={`applications/create/${data?.announcement_id}`}>
                    <button className="text-white cursor-pointer bg-primary">
                      <p className="px-5 py-3 text-white font-prompt text-subtitle-1">สมัคร</p>
                    </button>
                  </Link>
                )}
                {checkStatus(data?.start_date, data?.end_date, data?.status) === 'CLOSE' && (
                  <button className="text-white bg-opacity-50 bg-primary" disabled>
                    <p className="px-5 py-3 focus:outline-none text-white cursor-default font-prompt text-subtitle-1">
                      สมัคร
                    </p>
                  </button>
                )}
              </div>
            </div>
            <div className="w-full h-1 mt-2 mb-3 bg-secondary1" />
            <div>
              <div className="mb-2 font-bold text-primary font-sarabun text-subtitle-1">
                ประเภทของประกาศ
                <div className="pt-2 pb-5">
                  {_.map(data?.job_type, (item, i) => (
                    <span
                      key={i}
                      className="px-1 mr-2 text-sm text-white rounded font-prompt text-body-2 bg-primary">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-2 pb-5">
                <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
                  <Assignment className="mr-2" />
                  รายละเอียดงาน
                </Typography>
                <div className="mt-2 ml-1 text-black font-sarabun text-subtitle-1">
                  {data?.job_description}
                </div>
              </div>
              <div className="pt-2 pb-5">
                <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
                  <CheckBox className="mr-2" />
                  คุณสมบัติ
                </Typography>
                <div className="mt-2 ml-1 text-black font-sarabun text-subtitle-1">
                  {data?.property}
                </div>
              </div>
              <div className="pt-2 pb-5">
                <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
                  <AttachMoney />
                  เงินเดือน
                </Typography>
                <div className="mt-2 ml-1 text-black font-sarabun text-subtitle-1">
                  {data?.salary}
                </div>
              </div>
              <div className="pt-2 pb-5">
                <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
                  <FreeBreakfast className="mr-2" />
                  สวัสดิการ
                </Typography>
                <div className="mt-2 ml-1 text-black font-sarabun text-subtitle-1">
                  {data?.welfare}
                </div>
              </div>
              <div className="pt-2 pb-5">
                <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
                  <div className="flex flex-row">
                    <Business className="mr-2" />
                    <Link href={`/company/detail/${data?.company_id}`}>
                      <div className="cursor-pointer hover:underline hover:text-secondary1">
                        สถานที่ปฏิบัติงาน
                        <Launch style={{ fontSize: 'small' }} />
                      </div>
                    </Link>
                  </div>
                </Typography>
                <div className="mt-2 ml-1 text-black font-sarabun text-subtitle-1">
                  {data?.company_name_th} {data?.address_one} {data?.lane} {data?.road}
                  {data?.district} {data?.sub_district}
                  {data?.province} {data?.postal_code}
                </div>
              </div>
              <div className="pt-2 pb-5">
                <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
                  <QueryBuilder className="mr-2" />
                  วันที่ทำการ
                </Typography>
                <div className="mt-2 ml-1 text-black font-sarabun text-subtitle-1">
                  {data?.start_business_day} - {data?.end_business_day} เวลา{' '}
                  {data?.start_business_time} - {data?.end_business_time} น.
                </div>
              </div>
            </div>
          </div>
        </MaterialCard>
      </div>
    </div>
  )
}
