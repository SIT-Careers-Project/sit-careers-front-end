import React, { useContext, useEffect } from 'react'
import { Card as MaterialCard, CardMedia, CircularProgress } from '@material-ui/core'
import { InfoOutlined, Launch } from '@material-ui/icons'
import { Observer } from 'mobx-react-lite'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Link from 'next/link'
import getConfig from 'next/config'

import { announcementApplicationFormContext } from '../context/announcement_application_page_context'
import { AlertContext } from 'core/contexts/alert_context'
import { modalContext } from '../../../core/contexts/modal_context'
import { CoreModal } from '../../../core/components/Modal'
import PrimaryButton from '../../../core/components/Button/Primary'

const { publicRuntimeConfig } = getConfig()

const ApplicationInfo = () => {
  const context = useContext(announcementApplicationFormContext)
  const alertContext = useContext(AlertContext)
  const coreModalContext = useContext(modalContext)
  const router = useRouter()

  const { handleSubmit, register, reset } = useForm({
    defaultValues: { ...context.resume }
  })

  useEffect(() => {
    context.keyChange('modal', coreModalContext)
    context.keyChange('alert', alertContext)
    context.getAnnouncementById(router.query.announcement_id)
    context.getResumeByUserId().then(() => {
      setTimeout(() => {
        reset({ ...context.resume })
      }, 400)
      setTimeout(() => context.keyChange('renderDelay', false), 1000)
    })
  }, [context, coreModalContext, router, reset, alertContext])

  return (
    <Observer>
      {() => (
        <>
          {context.isLoading ? (
            <div className="z-30 flex justify-center">
              <CircularProgress className="mt-32" />
            </div>
          ) : (
            <>
              {' '}
              {!context.resume && (
                <div className="w-full h-full max-w-screen-lg py-5">
                  <MaterialCard
                    style={{
                      height: '550px',
                      boxShadow:
                        '10px -3px 15px rgba(0, 0, 0, 0.10), 4px -2px 6px rgba(0, 0, 0, 0.05)'
                    }}
                    className="grid w-full grid-cols-12 gap-4">
                    <div className="flex flex-wrap content-center justify-center col-span-7 px-6">
                      <div>
                        <div className="flex flex-row justify-center pb-5 font-prompt text-heading-6 text-primary">
                          <p>คุณไม่สามารถสมัครได้</p>
                        </div>
                        <div className="flex flex-row justify-center pb-5 font-prompt text-heading-6 text-primary">
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
                      className="relative flex items-end justify-end col-span-5"
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
                      minHeight: '550px',
                      boxShadow:
                        '10px -3px 15px rgba(0, 0, 0, 0.10), 4px -2px 6px rgba(0, 0, 0, 0.05)'
                    }}
                    className="grid w-full grid-cols-12 gap-4">
                    <div className="col-span-7 px-6 py-6 align-middle">
                      <span className="font-semibold font-prompt text-heading-6">สมัคร: </span>
                      <input
                        name="announcement_id"
                        ref={register}
                        value={context?.announcement?.announcement_id}
                        className="hidden"
                      />
                      <span className="font-semibold font-prompt text-heading-6 text-primary">
                        <Link
                          href={`${router.basePath}/academic-industry/announcements/${context?.announcement?.announcement_id}`}>
                          <a target="_blank" className="col-span-3 cursor-pointer text-primary">
                            {' '}
                            {context.announcement?.announcement_title}
                            <Launch style={{ fontSize: 'medium' }} className="ml-2" />
                          </a>
                        </Link>
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
                          <div className="grid flex-row grid-cols-4 pb-3">
                            <p className="col-span-1">ชื่อ:</p>
                            <div className="flex flex-row col-span-3">
                              <p className="pr-2"> {context?.resume?.name_title}</p>
                              <p className="pr-5"> {context?.resume?.first_name}</p>
                              <p className="pr-5"> {context?.resume?.last_name}</p>
                            </div>
                          </div>
                          <div className="grid flex-row grid-cols-4 pb-3">
                            <p className="col-span-1">สาขา:</p>
                            <p className="col-span-3 "> {context?.resume?.curriculum}</p>
                          </div>
                          <div className="grid flex-row grid-cols-4 pb-3">
                            <p className="col-span-1">ชั้นปี:</p>
                            <p className="col-span-3 "> {context?.resume?.year}</p>
                          </div>
                          <div className="grid flex-row grid-cols-4 pb-3">
                            <p className="col-span-1">เบอร์โทรศัพท์:</p>
                            <p className="col-span-3 "> {context?.resume?.tel_no}</p>
                          </div>
                          <div className="grid flex-row grid-cols-4 pb-3">
                            <p className="col-span-1">อีเมล:</p>
                            <p className="col-span-3 "> {context?.resume?.email}</p>
                          </div>
                          <div className="grid flex-row grid-cols-4 pb-3">
                            <p className="col-span-1">Link ผลงาน:</p>
                            {context?.resume?.resume_link ? (
                              <Link href={context?.resume?.resume_link}>
                                <a
                                  target="_blank"
                                  className="col-span-3 cursor-pointer text-secondary1">
                                  {' '}
                                  {context?.resume?.resume_link}
                                  <Launch style={{ fontSize: 'medium' }} className="mb-1 ml-1" />
                                </a>
                              </Link>
                            ) : (
                              <p className="col-span-3 ">-</p>
                            )}
                          </div>
                          <div className="grid flex-row grid-cols-4 pb-3 text">
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
                                      <Launch
                                        style={{ fontSize: 'medium' }}
                                        className="mb-1 ml-1"
                                      />
                                    </div>
                                  </a>
                                </div>
                              )}
                              {(context?.resume?.path_file === undefined ||
                                context?.resume?.path_file === '-') && <p>-</p>}
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
                                isDisable={context.disableButton}
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
                      className="relative flex items-end justify-end col-span-5"
                      image="/image/resume.svg"
                      title="Image Application SIT Career Center"
                      id="resume_second"
                    />
                  </MaterialCard>
                </div>
              )}
            </>
          )}
        </>
      )}
    </Observer>
  )
}
export default ApplicationInfo
