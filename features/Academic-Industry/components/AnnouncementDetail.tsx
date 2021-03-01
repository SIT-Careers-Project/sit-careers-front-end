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
import { Card as MaterialCard, Typography } from '@material-ui/core'
import Link from 'next/link'
import { Observer } from 'mobx-react-lite'

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
            <img
              alt="Announcement Banner"
              src={`url(${publicRuntimeConfig.s3_url}/cover_announcement/${data?.picture})`}
            />
          </div>
          <div className="p-5 align-middle">
            <div className="flex flex-row">
              <div className="w-3/4">
                <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
                  {data?.announcement_title}
                </Typography>
                {[`${data?.job_type}`, `${data?.job_position}`, `${data?.status}`].map(
                  (item, i) => (
                    <span
                      key={i}
                      className="px-1 mr-2 text-sm text-white rounded font-prompt text-body-2 bg-primary">
                      {item}
                    </span>
                  )
                )}
              </div>
              <Observer>
                {() => (
                  <>
                    <div className="flex justify-end w-1/4 h-12 grid-cols-12">
                      <Link href="/academic-industry/form-application">
                        <button className="text-white bg-primary">
                          <p className="px-5 py-3 text-white font-prompt text-subtitle-1">สมัคร</p>
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </Observer>
            </div>
            <div className="w-full h-1 mt-4 mb-3 bg-secondary1" />
            <div className="w-3/4">
              <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
                <QueryBuilder className="mb-2 mr-2" />
                {data?.start_date} - {data?.end_date}
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
