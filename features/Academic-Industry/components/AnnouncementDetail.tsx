/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import getConfig from 'next/config'
import _ from 'lodash'
import marked from 'marked'
import dayjs from 'dayjs'
import Link from 'next/link'

import {
  Assignment,
  AttachMoney,
  Business,
  CheckBox,
  FreeBreakfast,
  QueryBuilder,
  Launch,
  Link as LinkCopy
} from '@material-ui/icons'
import { Card as MaterialCard, Typography, Tooltip, ClickAwayListener } from '@material-ui/core'
import { TagStatus } from 'core/components/TagStatus'
import { checkStatus } from '../../../core/services/utils'

const { publicRuntimeConfig } = getConfig()

interface AnnouncementDetailProps {
  data: any
}

export const AnnouncementDetail = ({ data }: AnnouncementDetailProps) => {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)
  const [path, setPath] = useState('')
  const host = window.location.host
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {
    setPath(`http://${host}/academic-industry/applications/create`)
  }, [data])

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = () => {
    const el = document.createElement('input')
    el.value = `http://${location.host}/academic-industry/announcements/${data.announcement_id}`
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    setCopied(true)
    setOpen(true)
  }

  return (
    <div className="w-full ml-5 mr-auto md:w-5/12">
      <MaterialCard
        style={{
          minHeight: '1100px',
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
              <div className="flex mb-2 font-bold text-primary font-sarabun text-subtitle-1">
                {data?.announcement_title}
                <ClickAwayListener onClickAway={handleTooltipClose}>
                  <div>
                    <Tooltip
                      PopperProps={{
                        disablePortal: true
                      }}
                      onClose={handleTooltipClose}
                      open={open}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title="Copied!"
                      enterDelay={500}
                      leaveDelay={200}
                      arrow>
                      <button className="ml-2 focus:outline-none" onClick={handleTooltipOpen}>
                        <LinkCopy />
                      </button>
                    </Tooltip>
                  </div>
                </ClickAwayListener>
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
            <div className="flex flex-col items-center w-1/4 h-12 grid-cols-12">
              {checkStatus(data?.start_date, data?.end_date, data?.status) === 'OPEN' && (
                <Link href={`${path}/${data?.announcement_id}`} replace>
                  <button className="text-white cursor-pointer focus:outline-none bg-primary">
                    <p className="px-5 py-3 text-white font-prompt text-subtitle-1">สมัคร</p>
                  </button>
                </Link>
              )}
              {checkStatus(data?.start_date, data?.end_date, data?.status) === 'CLOSE' && (
                <button className="text-white bg-opacity-50 focus:outline-none bg-primary" disabled>
                  <p className="px-5 py-3 text-white cursor-default focus:outline-none font-prompt text-subtitle-1">
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
            <div className="pt-2">
              <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
                <Assignment className="mr-2" />
                รายละเอียดงาน
              </Typography>
              <div className="mt-2 ml-1 prose text-black font-sarabun text-subtitle-1">
                <div
                  dangerouslySetInnerHTML={{ __html: marked(data?.job_description || '') }}></div>
              </div>
            </div>
            <div className="pt-2">
              <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
                <CheckBox className="mr-2" />
                คุณสมบัติ
              </Typography>
              <div className="mt-2 ml-1 prose text-black font-sarabun text-subtitle-1">
                <div dangerouslySetInnerHTML={{ __html: marked(data?.property || '') }}></div>
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
              <div className="mt-2 ml-1 prose text-black font-sarabun text-subtitle-1">
                <div dangerouslySetInnerHTML={{ __html: marked(data?.welfare || '') }}></div>
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
  )
}
