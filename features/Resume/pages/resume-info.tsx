/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import {
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  Button
} from '@material-ui/core'
import { GetApp } from '@material-ui/icons'
import { Observer } from 'mobx-react-lite'
import getConfig from 'next/config'
import { resumeInfoPageContext } from '../context/resume_info_page_context'
import { modalContext } from '../../../core/contexts/modal_context'
import { CoreModal } from '../../../core/components/Modal'
import PrimaryButton from '../../../core/components/Button/Primary'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/router'
import { ResumeFormSchema } from '../services/validationSchema'
import { nameTitle, curriculum, years } from '../services/constantVariable'

const { publicRuntimeConfig } = getConfig()

const ResumeInfo = () => {
  const context = useContext(resumeInfoPageContext)
  const coreModalContext = useContext(modalContext)
  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState(null)
  const router = useRouter()

  const { handleSubmit, register, errors, control, reset } = useForm({
    resolver: yupResolver(ResumeFormSchema),
    defaultValues: { ...context.resume }
  })

  useEffect(() => {
    context.keyChange('modal', coreModalContext)
    context.getResumeByUserId().then(() => {
      setTimeout(() => {
        reset({ ...context.resume })
      }, 400)
      setTimeout(() => context.keyChange('renderDelay', false), 400)
    })
  }, [context, coreModalContext, router, reset])

  return (
    <Observer>
      {() => (
        <>
          {!context.renderDelay && (
            <div className="w-full h-full max-w-screen-lg pb-8">
              <div className="w-full max-w-screen-lg mx-auto mt-5 bg-white shadow-lg rounded-lg font-prompt p-5">
                <div className="px-12 pt-6">
                  <p className="font-semibold font-prompt text-heading-6 text-primary">
                    โปรไฟล์สมัครงาน
                  </p>
                </div>
                <div className="grid w-full grid-cols-12 px-6 py-3">
                  <div className="col-span-12">
                    <div className="flex flex-row justify-between px-6 py-3">
                      <input
                        className="hidden"
                        value={context?.resume?.resume_id}
                        name="resume_id"
                        ref={register}
                      />
                      <div className="w-3/12">
                        <FormControl
                          error={!!errors?.name_title}
                          className="w-full font-prompt"
                          variant="outlined">
                          <InputLabel htmlFor="prefix-select">คำนำหน้า *</InputLabel>
                          <Controller
                            control={control}
                            id="name-title-select"
                            name="name_title"
                            as={
                              <Select>
                                {nameTitle.map((name_title) => (
                                  <MenuItem key={name_title.title} value={name_title.title}>
                                    {name_title.title}
                                  </MenuItem>
                                ))}
                              </Select>
                            }
                          />
                          <FormHelperText>{errors.name_title?.message}</FormHelperText>
                        </FormControl>
                      </div>
                      <div className="w-4/12">
                        <FormControl className="w-full font-prompt">
                          <TextField
                            label="ชื่อ *"
                            className="w-full font-sarabun"
                            variant="outlined"
                            defaultValue=""
                            name="first_name"
                            inputRef={register}
                            error={!!errors.first_name}
                            helperText={errors.first_name?.message}
                          />
                        </FormControl>
                      </div>
                      <div className="w-4/12">
                        <TextField
                          label="นามสกุล *"
                          name="last_name"
                          defaultValue=""
                          variant="outlined"
                          className="font-sarabun"
                          inputRef={register}
                          error={!!errors.last_name}
                          helperText={errors.last_name?.message}
                          fullWidth
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="flex flex-row justify-between gap-5 px-6 py-3">
                      <div className="w-1/2">
                        <FormControl
                          error={!!errors?.curriculum}
                          className="w-full font-prompt"
                          variant="outlined">
                          <InputLabel htmlFor="curriculum-select">สาขา *</InputLabel>
                          <Controller
                            control={control}
                            id="curriculum-select"
                            name="curriculum"
                            as={
                              <Select id="trinity-select" name="curriculum">
                                {curriculum.map((data) => (
                                  <MenuItem key={data.value} value={data.value}>
                                    {data.title}
                                  </MenuItem>
                                ))}
                              </Select>
                            }
                          />
                          <FormHelperText>{errors.curriculum?.message}</FormHelperText>
                        </FormControl>
                      </div>
                      <div className="w-1/2">
                        <FormControl
                          error={!!errors?.year}
                          className="w-full font-prompt"
                          variant="outlined">
                          <InputLabel htmlFor="year-select">ชั้นปี *</InputLabel>
                          <Controller
                            control={control}
                            id="year-select"
                            name="year"
                            as={
                              <Select id="trinity-select" name="year">
                                {years.map((data) => (
                                  <MenuItem key={data.title} value={data.title}>
                                    {data.title}
                                  </MenuItem>
                                ))}
                              </Select>
                            }
                          />
                          <FormHelperText>{errors.year?.message}</FormHelperText>
                        </FormControl>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between gap-5 px-6 py-3">
                      <div className="w-1/2">
                        <TextField
                          label="เบอร์โทรศัพท์ *"
                          name="tel_no"
                          defaultValue=""
                          variant="outlined"
                          className="font-sarabun"
                          inputRef={register}
                          error={!!errors.tel_no}
                          helperText={errors.tel_no?.message}
                          fullWidth
                        />
                      </div>
                      <div className="w-1/2">
                        <TextField
                          label="อีเมล *"
                          name="email"
                          defaultValue=""
                          variant="outlined"
                          className="font-sarabun"
                          inputRef={register}
                          error={!!errors.email}
                          helperText={errors.email?.message}
                          fullWidth
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="px-6 pt-6 py-3">
                      <p className="font-semibold font-prompt text-heading-6 text-primary">
                        อัพโหลดผลงาน
                      </p>
                      <p className="font-prompt-light font-prompt text-body-2 text-secondary2 pt-3">
                        * ผลงานต้องเป็นไฟล์นามสกุล .pdf และมีขนาดไม่เกิน 5 MB
                      </p>
                    </div>

                    <div className="flex flex-row justify-between px-6 py-3">
                      <div className="w-full">
                        <TextField
                          label="Link ผลงาน *"
                          name="resume_link"
                          defaultValue=""
                          variant="outlined"
                          className="font-sarabun"
                          inputRef={register}
                          error={!!errors.resume_link}
                          helperText={errors.resume_link?.message}
                          fullWidth
                        />
                      </div>
                    </div>
                    <div className="w-full col-span-7 px-6 py-3">
                      <div className="flex flex-row">
                        {!(
                          context?.resume?.path_file === undefined ||
                          context?.resume?.path_file === '-'
                        ) && (
                          <div className="pr-5">
                            <a
                              href={`${publicRuntimeConfig.s3_url}/resume/${context?.resume?.path_file}`}
                              target="_self"
                              id="path_file"
                              download
                              onClick={() => {
                                const link = document.getElementById('path_file')
                                link.setAttribute(
                                  'download',
                                  `${publicRuntimeConfig.s3_url}/resume/${context?.resume?.path_file}`
                                )
                              }}>
                              <Button variant="contained" color="primary">
                                <GetApp />
                                ดาวน์โหลดผลงาน
                              </Button>
                            </a>
                          </div>
                        )}
                        <Button variant="contained" component="label">
                          Upload File
                          <input
                            id="file_resume"
                            name="file_resume"
                            type="file"
                            style={{ display: 'none' }}
                            ref={register}
                            onChange={(event) => {
                              setFile(URL.createObjectURL(event.target.files[0]))
                              context.keyChange('fileName', event.target.value)
                            }}
                          />
                          <input name="path_file" className="hidden" ref={register} />
                        </Button>
                        <span className="pl-5 pt-2">{context.fileName}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Observer>
                  {() => (
                    <>
                      {!context.resume && (
                        <div>
                          <div
                            className="flex justify-end grid-cols-12 px-12 my-6 gap-x-8"
                            id="button-create-resume">
                            <PrimaryButton
                              onClick={coreModalContext.openModal}
                              className="ml-10 shadow-md lg:w-2/6 btn-grad">
                              <p className="px-4 py-3 text-white font-prompt text-subtitle-1">
                                สร้างโปรไฟล์
                              </p>
                            </PrimaryButton>
                          </div>
                          <CoreModal
                            buttonSubmit="สร้าง"
                            title="สร้างโปรไฟล์"
                            content={
                              <span className="mb-5 font-prompt text-subtitle-1">
                                คุณต้องการสร้างโปรไฟล์ใช่หรือไม่
                              </span>
                            }
                            onSubmit={handleSubmit(context.createResume)}
                          />
                        </div>
                      )}
                      {context.resume && (
                        <div>
                          <div
                            className="flex justify-end grid-cols-12 px-12 my-6 gap-x-8"
                            id="button-application">
                            <PrimaryButton
                              onClick={coreModalContext.openModal}
                              className="ml-10 shadow-md lg:w-2/6 btn-grad">
                              <p className="px-4 py-3 text-white font-prompt text-subtitle-1">
                                บันทึกโปรไฟล์
                              </p>
                            </PrimaryButton>
                          </div>
                          <CoreModal
                            buttonSubmit="บันทึก"
                            title="บันทึกโปรไฟล์"
                            content={
                              <span className="mb-5 font-prompt text-subtitle-1">
                                คุณต้องการบันทึกโปรไฟล์ใช่หรือไม่
                              </span>
                            }
                            onSubmit={handleSubmit(context.updateResume)}
                          />
                        </div>
                      )}
                    </>
                  )}
                </Observer>
              </div>
            </div>
          )}
        </>
      )}
    </Observer>
  )
}
export default ResumeInfo
