import { Controller, useForm } from 'react-hook-form'
import {
  Dialog,
  DialogActions,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { companyType, days } from '../services/constantVariable'

import { Avatar } from '../../../core/components/Avatar'
import { CompanyFormSchema } from '../services/validationSchema'
import { Observer } from 'mobx-react-lite'
import { companyUpdatePageContext } from '../contexts/company_update_page_context'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'

const { publicRuntimeConfig } = getConfig()

const CompanyForm = () => {
  const context = useContext(companyUpdatePageContext)

  const router = useRouter()
  const { company_id } = router.query
  const [file, setFile] = useState(null)
  const [renderDelay, setRenderDelay] = useState(true)

  const { handleSubmit, register, errors, control, reset } = useForm({
    resolver: yupResolver(CompanyFormSchema),
    defaultValues: { ...context.company }
  })

  useEffect(() => {
    if (context.router) {
      router.push('/company/company-table')
    }
    context.getCompany(company_id)
  }, [company_id, context, router])

  useEffect(() => {
    setTimeout(() => reset({ ...context.company }), 400)
    setTimeout(() => setRenderDelay(false), 1000)
  }, [context.company, reset])

  return (
    <>
      {!renderDelay && (
        <Observer>
          {() => (
            <div className="w-full max-w-screen-lg my-6 bg-white border-opacity-50 rounded font-prompt border-DEFAULT border-secondary2">
              <div className="px-6 pt-6">
                <p className="font-semibold font-prompt text-heading-6">ข้อมูลบริษัท</p>
                <button className="border-none focus:outline-none">
                  <label htmlFor="company_logo_image">
                    <Avatar
                      imgSrc={
                        file === null || context?.company?.logo === undefined
                          ? `${publicRuntimeConfig.s3_url}/logo/${context?.company?.logo}`
                          : file
                      }
                      className="mt-5 cursor-pointer bg-grey-100"
                    />
                  </label>
                  <input
                    id="company_logo_image"
                    name="company_logo_image"
                    type="file"
                    className="hidden bg-grey-100"
                    ref={register}
                    onChange={(event) => {
                      setFile(URL.createObjectURL(event.target.files[0]))
                    }}
                  />
                  <input name="logo" className="hidden" ref={register} />
                </button>
              </div>
              <div className="flex flex-row justify-between px-6 py-6">
                <div className="w-1/2 pr-3">
                  <input
                    className="hidden"
                    value={context?.company?.company_id}
                    name="company_id"
                    ref={register}
                  />
                  <TextField
                    name="company_name_th"
                    label="ชื่อภาษาไทย *"
                    className="font-sarabun bg-grey-100"
                    defaultValue={context?.company?.company_name_th}
                    inputRef={register}
                    error={!!errors.company_name_th}
                    helperText={errors.company_name_th?.message}
                    fullWidth
                  />
                </div>
                <div className="w-1/2 pl-3">
                  <TextField
                    label="ชื่อภาษาอังกฤษ *"
                    name="company_name_en"
                    className="font-sarabun bg-grey-100"
                    defaultValue=""
                    inputRef={register}
                    error={!!errors.company_name_en}
                    helperText={errors.company_name_en?.message}
                    fullWidth
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between px-6">
                <div className="w-1/2 pr-3">
                  <FormControl
                    error={!!errors?.company_type}
                    className="w-full font-prompt bg-grey-100">
                    <InputLabel htmlFor="trinity-select">ประเภทธุรกิจ *</InputLabel>
                    <Controller
                      control={control}
                      name="company_type"
                      as={
                        <Select id="trinity-select">
                          {companyType.map((company) => (
                            <MenuItem key={company.title} value={company.title}>
                              {company.title}
                            </MenuItem>
                          ))}
                        </Select>
                      }
                    />
                    <FormHelperText>{errors.company_type?.message}</FormHelperText>
                  </FormControl>
                </div>
                <div className="w-1/2 pl-3">
                  <TextField
                    label="เว็บไซต์"
                    name="website"
                    className="font-sarabun bg-grey-100"
                    defaultValue=""
                    inputRef={register}
                    error={!!errors.website}
                    helperText={errors.website?.message}
                    fullWidth
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between p-6">
                <FormControl error={!!errors?.about_us} className="w-full font-prompt bg-grey-100">
                  <Controller
                    control={control}
                    name="about_us"
                    as={
                      <TextField
                        label="แนะนำ *"
                        name="about_us"
                        className="border-opacity-50 place-content-start bg-grey-100 border-DEFAULT"
                        variant="outlined"
                        defaultValue=""
                        error={!!errors?.about_us}
                        helperText={errors.about_us?.message}
                        rows={5}
                        multiline
                        fullWidth
                      />
                    }
                  />
                </FormControl>
              </div>
              <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
              <div className="flex flex-col px-6 pb-6">
                <p className="mb-4 font-semibold font-prompt text-heading-6">รายละเอียดบริษัท</p>
                <FormControl
                  error={!!errors?.description}
                  className="w-full font-prompt bg-grey-100">
                  <Controller
                    control={control}
                    name="description"
                    as={
                      <TextField
                        label="รายละเอียด *"
                        name="description"
                        className="border-opacity-50 place-content-start bg-grey-100 border-DEFAULT"
                        variant="outlined"
                        defaultValue=""
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        rows={5}
                        multiline
                        fullWidth
                      />
                    }
                  />
                </FormControl>
              </div>
              <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
              <p className="mb-3 ml-6 font-semibold font-prompt text-heading-6">ข้อมูลติดต่อ</p>
              <div className="flex flex-row justify-between px-6">
                <div className="w-1/2 pb-6 pr-3">
                  <TextField
                    label="อีเมล์ผู้จัดการ *"
                    name="e_mail_manager"
                    className="font-sarabun bg-grey-100"
                    defaultValue=""
                    inputRef={register}
                    error={!!errors.e_mail_manager}
                    helperText={errors.e_mail_manager?.message}
                    fullWidth
                  />
                </div>
                <div className="w-1/2 pl-3">
                  <TextField
                    label="อีเมล์ผู้ประสานงาน *"
                    name="e_mail_coordinator"
                    className="font-sarabun bg-grey-100"
                    defaultValue=""
                    inputRef={register}
                    error={!!errors.e_mail_coordinator}
                    helperText={errors.e_mail_coordinator?.message}
                    fullWidth
                  />
                </div>
              </div>
              <p className="mb-3 ml-6 font-semibold font-prompt text-heading-6">เบอร์ติดต่อ</p>
              <div className="flex flex-row justify-between px-6 pb-6">
                <div className="w-1/2 pr-3">
                  <TextField
                    label="เบอร์สำนักงาน *"
                    name="tel_no"
                    className="font-sarabun bg-grey-100"
                    defaultValue=""
                    inputRef={register}
                    error={!!errors.tel_no}
                    helperText={errors.tel_no?.message}
                    fullWidth
                  />
                </div>
                <div className="w-1/2 pl-3">
                  <TextField
                    label="เบอร์ผู้ประสานงาน *"
                    name="phone_no"
                    className="font-sarabun bg-grey-100"
                    type="phone"
                    defaultValue=""
                    inputRef={register}
                    error={!!errors.phone_no}
                    helperText={errors.phone_no?.message}
                    fullWidth
                  />
                </div>
              </div>
              <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
              <p className="mb-3 ml-6 font-semibold font-prompt text-heading-6">สถานที่ทำการ</p>
              <div className="w-full px-6">
                <TextField
                  label="ที่อยู่ 1 *"
                  name="address_one"
                  className="font-sarabun bg-grey-100"
                  defaultValue=""
                  inputRef={register}
                  error={!!errors.address_one}
                  helperText={errors.address_one?.message}
                  fullWidth
                />
              </div>
              <div className="w-full px-6 my-6">
                <TextField
                  label="ที่อยู่ 2"
                  name="address_two"
                  className="font-sarabun bg-grey-100"
                  defaultValue=""
                  inputRef={register}
                  error={!!errors.address_two}
                  helperText={errors.address_two?.message}
                  fullWidth
                />
              </div>
              <div className="flex flex-row justify-between">
                <div className="w-4/12 pl-6 pr-3">
                  <TextField
                    label="ซอย"
                    name="lane"
                    className="font-sarabun bg-grey-100"
                    defaultValue=""
                    inputRef={register}
                    error={!!errors.lane}
                    helperText={errors.lane?.message}
                    fullWidth
                  />
                </div>
                <div className="w-4/12 pl-3 pr-3">
                  <TextField
                    name="road"
                    label="ถนน"
                    className="font-sarabun bg-grey-100"
                    defaultValue=""
                    inputRef={register}
                    error={!!errors.road}
                    helperText={errors.road?.message}
                    fullWidth
                  />
                </div>
                <div className="w-4/12 pl-3 pr-6">
                  <TextField
                    name="sub_district"
                    label="ตำบล/เขต *"
                    className="font-sarabun bg-grey-100"
                    defaultValue=""
                    inputRef={register}
                    error={!!errors.sub_district}
                    helperText={errors.sub_district?.message}
                    fullWidth
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between pb-6 mt-6">
                <div className="w-4/12 pl-6 pr-3">
                  <TextField
                    name="district"
                    label="อำเภอ *"
                    className="font-sarabun bg-grey-100"
                    defaultValue=""
                    inputRef={register}
                    error={!!errors.district}
                    helperText={errors.district?.message}
                    fullWidth
                  />
                </div>
                <div className="w-4/12 px-3">
                  <TextField
                    name="province"
                    label="จังหวัด *"
                    className="font-sarabun bg-grey-100"
                    defaultValue=""
                    inputRef={register}
                    error={!!errors.province}
                    helperText={errors.province?.message}
                    fullWidth
                  />
                </div>
                <div className="w-4/12 pl-3 pr-6">
                  <TextField
                    name="postal_code"
                    label="รหัสไปรษณีย์ *"
                    className="font-sarabun bg-grey-100"
                    defaultValue=""
                    inputRef={register}
                    error={!!errors.postal_code}
                    helperText={errors.postal_code?.message}
                    fullWidth
                  />
                </div>
              </div>
              <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
              <p className="mb-3 ml-6 font-semibold font-prompt text-heading-6">วันที่ทำการ</p>
              <div className="flex flex-row pb-6">
                <div className="w-4/12 pl-6 pr-3">
                  <FormControl
                    error={!!errors?.start_business_day}
                    className="w-full font-prompt bg-grey-100">
                    <InputLabel htmlFor="start-business-day-select">วันเปิดทำการ *</InputLabel>
                    <Controller
                      control={control}
                      name="start_business_day"
                      as={
                        <Select id="start-business-day-select">
                          {days.map((data) => (
                            <MenuItem key={data.day} value={data.day}>
                              {data.day}
                            </MenuItem>
                          ))}
                        </Select>
                      }
                    />
                    <FormHelperText>{errors.start_business_day?.message}</FormHelperText>
                  </FormControl>
                </div>
                <div className="w-4/12 pl-3 pr-3">
                  <TextField
                    name="start_business_time"
                    label="เวลาเปิดทำการ *"
                    className="font-sarabun bg-grey-100"
                    defaultValue=""
                    type="time"
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputRef={register}
                    error={!!errors.start_business_time}
                    helperText={errors.start_business_time?.message}
                    fullWidth
                  />
                </div>
                <div className="flex items-end justify-center col-span-1">
                  <p className="font-semibold text-heading-6 font-prompt">ถึง</p>
                </div>
                <div className="w-4/12 pl-3 pr-3">
                  <FormControl
                    error={!!errors?.end_business_day}
                    className="w-full font-prompt bg-grey-100">
                    <InputLabel htmlFor="end-business-day-select">วันเปิดทำการ *</InputLabel>
                    <Controller
                      control={control}
                      name="end_business_day"
                      as={
                        <Select id="end-business-day-select">
                          {days.map((data) => (
                            <MenuItem key={data.day} value={data.day}>
                              {data.day}
                            </MenuItem>
                          ))}
                        </Select>
                      }
                    />
                    <FormHelperText>{errors.end_business_day?.message}</FormHelperText>
                  </FormControl>
                </div>
                <div className="w-4/12 pl-3 pr-6">
                  <TextField
                    name="end_business_time"
                    label="เวลาปิดทำการ *"
                    className="font-sarabun bg-grey-100"
                    type="time"
                    defaultValue=""
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputRef={register}
                    error={!!errors.end_business_time}
                    helperText={errors.end_business_time?.message}
                    fullWidth
                  />
                </div>
              </div>
              <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
              <p className="mb-3 ml-6 font-semibold font-prompt text-heading-6">MOU</p>
              <div className="flex flex-row justify-between">
                <div className="w-1/2 pl-6 pr-3">
                  <TextField
                    label="ประเภท MOU"
                    name="mou_type"
                    className="font-sarabun bg-grey-100"
                    defaultValue=""
                    inputRef={register}
                    error={!!errors.mou_type}
                    helperText={errors.mou_type?.message}
                    fullWidth
                  />
                </div>
                <div className="w-1/2 pl-3 pr-6">
                  <TextField
                    label="ระยะสัญญา"
                    name="contact_period"
                    className="font-sarabun bg-grey-100"
                    type="date"
                    defaultValue=""
                    inputRef={register}
                    error={!!errors.contact_period}
                    helperText={errors.contact_period?.message}
                    InputLabelProps={{
                      shrink: true
                    }}
                    fullWidth
                  />
                </div>
              </div>
              <div className="p-6">
                <TextField
                  label="MOU Link"
                  name="mou_link"
                  className="font-sarabun bg-grey-100"
                  defaultValue=""
                  inputRef={register}
                  error={!!errors.mou_link}
                  helperText={errors.mou_link?.message}
                  fullWidth
                />
              </div>

              <div className="flex justify-end grid-cols-12 px-6 my-6 gap-x-8">
                <button onClick={context.handleModal} className="text-white bg-primary">
                  <p className="px-5 py-2 font-prompt">บันทึก</p>
                </button>
              </div>
              <Dialog open={context.showModal} onClose={context.handleCloseModal}>
                <div className="p-4 text-left">
                  <p className="mb-3 mr-40 font-prompt-medium text-heading-6">บันทึกข้อมูลบริษัท</p>
                  <span className="mb-5 font-prompt text-subtitle-1">
                    คุณต้องการบันทึกข้อมูลบริษัทหรือไม่
                  </span>
                  <DialogActions className="mt-4">
                    <button onClick={context.handleCloseModal} className="text-secondary2">
                      <p className="px-5 py-2 font-prompt">ยกเลิก</p>
                    </button>
                    <button
                      onClick={handleSubmit(context.updateCompany)}
                      className="text-white bg-primary">
                      <p className="px-5 py-2 font-prompt">บันทึก</p>
                    </button>
                  </DialogActions>
                </div>
              </Dialog>
            </div>
          )}
        </Observer>
      )}
    </>
  )
}

export default CompanyForm
