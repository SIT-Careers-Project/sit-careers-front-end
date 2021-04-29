import React, { useContext, useEffect } from 'react'
import { Card as MaterialCard, CardMedia } from '@material-ui/core'
import { InfoOutlined, Launch } from '@material-ui/icons'
import { Observer } from 'mobx-react-lite'
import { announcementApplicationFormContext } from '../context/announcement_application_page_context'
import { modalContext } from '../../../core/contexts/modal_context'
import { CoreModal } from '../../../core/components/Modal'
import PrimaryButton from '../../../core/components/Button/Primary'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Link from 'next/link'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const ApplicationInfo = () => {
  const context = useContext(announcementApplicationFormContext)
  const coreModalContext = useContext(modalContext)
  const router = useRouter()

  const { handleSubmit, register, reset } = useForm({
    defaultValues: { ...context.resume }
  })

  useEffect(() => {
    context.keyChange('modal', coreModalContext)
    context.getAnnouncementById(router.query.announcement_id)
    context.getResumeByUserId().then(() => {
      setTimeout(() => {
        reset({ ...context.resume })
      }, 400)
      setTimeout(() => context.keyChange('renderDelay', false), 1000)
    })
  }, [context, coreModalContext, router, reset])

  return (
    <Observer>
      {() => (
        <>
          {!context.resume && (
            <div className="w-full h-full max-w-screen-lg pt-5">
              <MaterialCard
                style={{
                  height: '550px',
                  boxShadow: '10px -3px 15px rgba(0, 0, 0, 0.10), 4px -2px 6px rgba(0, 0, 0, 0.05)'
                }}
                className="w-full grid grid-cols-12 gap-4">
                <div className="col-span-7 px-6 flex flex-wrap content-center justify-center">
                  <div>
                    <div className="flex flex-row font-prompt text-heading-6 text-primary pb-5 justify-center">
                      <p>คุณไม่สามารถสมัครได้</p>
                    </div>
                    <div className="flex flex-row font-prompt text-heading-6 text-primary pb-5 justify-center">
                      <p>กรุณาสร้างโปรไฟล์สมัครงานของคุณ</p>
                    </div>
                    <Link href="/resume/info">
                      <PrimaryButton className="shadow-md btn-grad">
                        <p className="px-4 py-3 text-white font-prompt text-subtitle-1">
                          สร้างโปรไฟล์สมัครงาน
                        </p>
                      </PrimaryButton>
                    </Link>
                  </div>
                </div>
                <CardMedia
                  className="col-span-5 flex justify-end items-end relative"
                  image="/image/resume.svg"
                  title="-"
                  id="resume_second"
                />
              </MaterialCard>
            </div>
          )}
          {context.resume && (
            <div className="w-full h-full max-w-screen-lg pb-3">
              <MaterialCard
                style={{
                  height: '550px',
                  boxShadow: '10px -3px 15px rgba(0, 0, 0, 0.10), 4px -2px 6px rgba(0, 0, 0, 0.05)'
                }}
                className="w-full grid grid-cols-12 gap-4">
                <div className="col-span-7 px-6 py-6 align-middle">
                  <span className="font-semibold font-prompt text-heading-6">สมัคร: </span>
                  <input
                    name="announcement_id"
                    ref={register}
                    value={context?.announcement?.announcement_id}
                    className="hidden"
                  />
                  <span className="font-semibold font-prompt text-heading-6 text-primary">
                    {context.announcement?.announcement_title}
                  </span>
                  <div className="w-full h-1 mt-5 mb-5 bg-secondary1" />
                  <div>
                    <div className="font-prompt-light text-body-1 text-primary">
                      <InfoOutlined className="mb-2 mr-2" />
                      โปรดตรวจสอบข้อมูลการสมัครงานของคุณก่อนกดสมัคร
                    </div>
                    <div className="py-5 font-prompt text-body-1">
                      <input
                        className="hidden"
                        value={context?.resume?.resume_id}
                        name="resume_id"
                        ref={register}
                      />
                      <div className="flex flex-row pb-3 grid grid-cols-4">
                        <p className="col-span-1">ชื่อ:</p>
                        <div className="col-span-3 flex flex-row">
                          <p className="pr-2"> {context?.resume?.name_title}</p>
                          <p className="pr-5"> {context?.resume?.first_name}</p>
                          <p className="pr-5"> {context?.resume?.last_name}</p>
                        </div>
                      </div>
                      <div className="flex flex-row pb-3 grid grid-cols-4">
                        <p className="col-span-1">สาขา:</p>
                        <p className="col-span-3 "> {context?.resume?.curriculum}</p>
                      </div>
                      <div className="flex flex-row pb-3 grid grid-cols-4">
                        <p className="col-span-1">ชั้นปี:</p>
                        <p className="col-span-3 "> {context?.resume?.year}</p>
                      </div>
                      <div className="flex flex-row pb-3 grid grid-cols-4">
                        <p className="col-span-1">เบอร์โทรศัพท์:</p>
                        <p className="col-span-3 "> {context?.resume?.tel_no}</p>
                      </div>
                      <div className="flex flex-row pb-3 grid grid-cols-4">
                        <p className="col-span-1">อีเมล:</p>
                        <p className="col-span-3 "> {context?.resume?.email}</p>
                      </div>
                      <div className="flex flex-row pb-3 grid grid-cols-4">
                        <p className="col-span-1">Link ผลงาน:</p>
                        <p className="col-span-3 "> {context?.resume?.resume_link}</p>
                      </div>
                      <div className="flex flex-row pb-3 grid grid-cols-4 text">
                        <p className="col-span-1">ไฟล์ผลงาน:</p>
                        <div className="col-span-3 ">
                          {!(
                            context?.resume?.path_file === undefined ||
                            context?.resume?.path_file === '-'
                          ) && (
                            <div>
                              <a
                                href={`${publicRuntimeConfig.s3_url}/resume/${context?.resume?.path_file}`}>
                                <div className="cursor-pointer hover:underline text-secondary1">
                                  ดาวน์โหลดผลงาน
                                  <Launch style={{ fontSize: 'medium' }} className="ml-1 mb-1" />
                                </div>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <Observer>
                      {() => (
                        <>
                          <div
                            className="flex justify-end grid-cols-12 my-6 gap-x-8"
                            id="button-application">
                            <PrimaryButton
                              onClick={coreModalContext.openModal}
                              className="ml-10 shadow-md lg:w-2/6 btn-grad">
                              <p className="px-4 py-3 text-white font-prompt text-subtitle-1">
                                ยืนยันการสมัคร
                              </p>
                            </PrimaryButton>
                          </div>
                          <CoreModal
                            buttonSubmit="สมัคร"
                            title="ยืนยันการสมัคร"
                            content={
                              <span className="mb-5 font-prompt text-subtitle-1">
                                คุณต้องการยืนยันการสมัครใช่หรือไม่
                              </span>
                            }
                            onSubmit={handleSubmit(context.createApplication)}
                          />
                        </>
                      )}
                    </Observer>
                  </div>
                </div>
                <CardMedia
                  className="col-span-5 flex justify-end items-end relative"
                  image="/image/resume.svg"
                  title="-"
                  id="resume_second"
                />
              </MaterialCard>
            </div>
          )}
        </>
      )}
    </Observer>
  )
}
export default ApplicationInfo
