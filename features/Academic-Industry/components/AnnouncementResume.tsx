import React from 'react'
import { Business, CheckBox, Event } from '@material-ui/icons'

const AnnouncementResumeInfo = (props) => {
  const { data, register, applicationDate } = props

  return (
    <div className="w-full max-w-screen-lg px-5 py-5 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
      <div className="col-span-7 px-6 align-middle">
        <div className="font-semibold font-prompt text-heading-6">
          <div className="flex flex-row grid grid-cols-6">
            <p className="col-span-1">ประกาศรับสมัคร:</p>
            <p className="col-span-3 text-primary"> {data.announcement_title}</p>
          </div>
        </div>
        <input
          name="announcement_resume_id"
          ref={register}
          value={data?.announcement_resume_id}
          className="hidden"
        />
        <div className="py-5 font-prompt text-body-1">
          <div className="flex flex-row pb-3 grid grid-cols-6">
            <p className="col-span-1 text-primary">
              <Event className="mb-2 mr-2" />
              วันที่สมัคร:
            </p>
            <p className="col-span-3 "> {applicationDate}</p>
          </div>
          <div className="flex flex-row pb-3 grid grid-cols-6">
            <p className="col-span-1 text-primary">
              <Business className="mb-2 mr-2" />
              บริษัท:
            </p>
            <p className="col-span-3 "> {data.company_name_th}</p>
          </div>
          <div className="flex flex-row pb-3 grid grid-cols-6">
            <p className="col-span-1 text-primary">
              <CheckBox className="mb-2 mr-2" />
              สถานะปัจจุบัน:
            </p>
            <p className="col-span-3 "> {data.status}</p>
          </div>
        </div>
        <hr className="mb-6 font-semibold opacity-25 text-secondary2" />
        <div>
          <span className="font-semibold font-prompt text-heading-6">ข้อมูลผู้สมัคร </span>
          <div className="py-5 font-prompt text-body-1">
            <div className="flex flex-row pb-3 grid grid-cols-6">
              <p className="col-span-1">ชื่อ:</p>
              <div className="col-span-3 flex flex-row">
                <p className="pr-2"> {data.name_title}</p>
                <p className="pr-5"> {data.first_name}</p>
                <p className="pr-5"> {data.last_name}</p>
              </div>
            </div>
            <div className="flex flex-row pb-3 grid grid-cols-6">
              <p className="col-span-1">สาขา:</p>
              <p className="col-span-3 "> {data.curriculum}</p>
            </div>
            <div className="flex flex-row pb-3 grid grid-cols-6">
              <p className="col-span-1">ชั้นปี:</p>
              <p className="col-span-3 "> {data.year}</p>
            </div>
            <div className="flex flex-row pb-3 grid grid-cols-6">
              <p className="col-span-1">เบอร์โทรศัพท์:</p>
              <p className="col-span-3 "> {data.tel_no}</p>
            </div>
            <div className="flex flex-row pb-3 grid grid-cols-6">
              <p className="col-span-1">อีเมล:</p>
              <p className="col-span-3 "> {data.email}</p>
            </div>
            <div className="flex flex-row grid grid-cols-6">
              <p className="col-span-1">Link ผลงาน:</p>
              <p className="col-span-3 "> {data.resume_link}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AnnouncementResumeInfo
