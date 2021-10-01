/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react'
import { Business, CheckBox, Event, Launch } from '@material-ui/icons'
import getConfig from 'next/config'
import Link from 'next/link'
import { useRouter } from 'next/router'

const { publicRuntimeConfig } = getConfig()

const AnnouncementResumeInfo = (props) => {
  const { data, register, applicationDate } = props
  const router = useRouter()

  useEffect(() => {}, [data, applicationDate])

  return (
    <div className="w-full max-w-screen-lg px-5 py-5 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
      <div className="col-span-7 px-6 align-middle">
        <div className="font-semibold font-prompt text-heading-6">
          <div className="grid flex-row grid-cols-6">
            <p className="col-span-1">ประกาศรับสมัคร:</p>
            <Link
              href={`${router.basePath}/academic-industry/announcements/${data?.announcement_id}`}>
              <a target="_blank" className="col-span-3 cursor-pointer text-primary">
                {' '}
                {data?.announcement_title}
                <Launch style={{ fontSize: 'medium' }} className="ml-2" />
              </a>
            </Link>
          </div>
        </div>
        <input
          name="announcement_resume_id"
          ref={register}
          value={data?.announcement_resume_id}
          className="hidden"
        />
        <div className="py-5 font-prompt text-body-1">
          <div className="grid flex-row grid-cols-6 pb-3">
            <p className="col-span-1 text-primary">
              <Event className="mb-2 mr-2" />
              วันที่สมัคร:
            </p>
            <p className="col-span-3 pt-1"> {applicationDate}</p>
          </div>
          <div className="grid flex-row grid-cols-6 pb-3">
            <p className="col-span-1 text-primary">
              <Business className="mb-2 mr-2" />
              บริษัท:
            </p>
            <p className="col-span-3 pt-1"> {data?.company_name_th}</p>
          </div>
          <div className="grid flex-row grid-cols-6 pb-3">
            <p className="col-span-1 text-primary">
              <CheckBox className="mb-2 mr-2" />
              สถานะปัจจุบัน:
            </p>
            <p className="col-span-3 pt-1"> {data?.status}</p>
          </div>
        </div>
        <hr className="mb-6 font-semibold opacity-25 text-secondary2" />
        <div>
          <span className="font-semibold font-prompt text-heading-6">ข้อมูลผู้สมัคร </span>
          <div className="py-5 font-prompt text-body-1">
            <div className="grid flex-row grid-cols-6 pb-3">
              <p className="col-span-1">ชื่อ:</p>
              <div className="flex flex-row col-span-3">
                <p className="pr-2"> {data?.name_title}</p>
                <p className="pr-5"> {data?.first_name}</p>
                <p className="pr-5"> {data?.last_name}</p>
              </div>
            </div>
            <div className="grid flex-row grid-cols-6 pb-3">
              <p className="col-span-1">มหาวิทยาลัย:</p>
              <p className="col-span-3">{data?.university_name}</p>
            </div>
            <div className="grid flex-row grid-cols-6 pb-3">
              <p className="col-span-1">สาขา:</p>
              <p className="col-span-3 "> {data?.curriculum}</p>
            </div>
            <div className="grid flex-row grid-cols-6 pb-3">
              <p className="col-span-1">ชั้นปี:</p>
              <p className="col-span-3 "> {data?.year}</p>
            </div>
            <div className="grid flex-row grid-cols-6 pb-3">
              <p className="col-span-1">เบอร์โทรศัพท์:</p>
              <p className="col-span-3 "> {data?.tel_no}</p>
            </div>
            <div className="grid flex-row grid-cols-6 pb-3">
              <p className="col-span-1">อีเมล:</p>
              {data?.email && (
                <a
                  href={`mailto:${data?.email}`}
                  className="col-span-3 cursor-pointer hover:underline text-secondary1">
                  {' '}
                  {data?.email}
                  <Launch style={{ fontSize: 'medium' }} className="mb-1 ml-1" />
                </a>
              )}
            </div>
            <div className="grid flex-row grid-cols-6 pb-3">
              <p className="col-span-1">Link ผลงาน:</p>
              {data?.resume_link ? (
                <Link href={data?.resume_link}>
                  <a
                    target="_blank"
                    className="col-span-3 cursor-pointer hover:underline text-secondary1">
                    {' '}
                    {data?.resume_link}
                    <Launch style={{ fontSize: 'medium' }} className="mb-1 ml-1" />
                  </a>
                </Link>
              ) : (
                <p className="col-span-3 ">-</p>
              )}
            </div>
            <div className="grid flex-row grid-cols-6">
              <p className="col-span-1">ไฟล์ผลงาน:</p>
              <div className="col-span-3">
                {!(data?.path_file === undefined || data?.path_file === '-') && (
                  <div>
                    <a href={`${publicRuntimeConfig.s3_url}/resume/${data?.path_file}`}>
                      <div className="cursor-pointer hover:underline text-secondary1">
                        ดาวน์โหลดผลงาน
                        <Launch style={{ fontSize: 'medium' }} className="mb-1 ml-1" />
                      </div>
                    </a>
                  </div>
                )}
                {(data?.path_file === undefined || data?.path_file === '-') && (
                  <div>
                    <p>-</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AnnouncementResumeInfo
