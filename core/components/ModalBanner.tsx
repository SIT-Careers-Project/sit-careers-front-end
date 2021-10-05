import React, { useContext, useCallback, useEffect, useRef, useState } from 'react'
import getConfig from 'next/config'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import _ from 'lodash'
import dayjs from 'dayjs'
import { Dialog, TextField } from '@material-ui/core'
import { Panorama, NavigateNext, ArrowBackIos } from '@material-ui/icons'
import { Observer } from 'mobx-react-lite'

import { navbarContext } from '../contexts/navbar_context'
import { ModalBannerContext } from '../contexts/modal_banner_image_context'
import { checkAspectRatio } from 'core/services/utils'

const { publicRuntimeConfig } = getConfig()
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

const ModalBannerValidation = yup.object().shape({
  file_banner: yup
    .mixed()
    .notRequired()
    .test('fileFormat', 'ไฟล์ต้องเป็นนามสกุล .jpg .jpeg .gif และ .png', (value) => {
      if (value.length !== 0) {
        return value && SUPPORTED_FORMATS.includes(value[0].type)
      } else {
        return true
      }
    })
    .test('fileSize', 'รูปต้องมีขนาดไม่เกิน 5MB', (value) => {
      if (value.length !== 0) {
        return value && value[0].size <= 5242880
      } else {
        return true
      }
    }),
  date_display_end: yup.string().required('จำเป็นต้องกรอก วันเริ่มต้น'),
  date_display_start: yup.string().required('จำเป็นต้องกรอก วันเริ่มต้น'),
  path_image: yup.string()
})

const ModalBannerDeleteValidation = yup.object().shape({
  file_banner: yup
    .mixed()
    .notRequired()
    .test('fileFormat', 'ไฟล์ต้องเป็นนามสกุล .jpg .jpeg .gif และ .png', (value) => {
      if (value.length !== 0) {
        return value && SUPPORTED_FORMATS.includes(value[0].type)
      } else {
        return true
      }
    })
    .test('fileSize', 'รูปต้องมีขนาดไม่เกิน 5MB', (value) => {
      if (value.length !== 0) {
        return value && value[0].size <= 5242880
      } else {
        return true
      }
    }),
  date_display_end: yup.string(),
  date_display_start: yup.string(),
  path_image: yup.string()
})

export const ModalBanner = () => {
  const contextNavbar = useContext(navbarContext)
  const context = useContext(ModalBannerContext)
  const [isUpdate, setIsUpdate] = useState(false)
  const ref = useRef(null)

  const { handleSubmit, register, errors, reset, setError } = useForm({
    resolver: yupResolver(
      context.updateBanner ? ModalBannerDeleteValidation : ModalBannerValidation
    ),
    defaultValues: { ...context.banner }
  })

  const handlerImage = async (event) => {
    let value
    if (!event.target.files[0]) {
      value = null
    } else {
      value = event?.target?.files[0]
      const image = new Image()
      image.src = URL?.createObjectURL(value)
      image.onload = function () {
        const url = URL?.createObjectURL(value)
        if (checkAspectRatio(image.width, image.height) === 3.2) {
          context.changeKey('file', url)
          setError('file_banner', {})
        } else {
          setError('file_banner', {
            type: 'manual',
            message: '*ไม่สามารถอัปโหลดไฟล์ได้เนื่องจากรูปภาพมีขนาดไม่ตรงตามที่กำหนด'
          })
        }
      }
    }
  }

  useCallback(() => {
    context.banners
  }, [context.banners])

  useEffect(() => {
    context.getBanners()
    reset(context.banner)
  }, [context, reset])

  return (
    <Observer>
      {() => (
        <Dialog
          open={contextNavbar.isOpenModalBanner}
          ref={ref}
          onClose={() => contextNavbar.changeKey('isOpenModalBanner', false)}>
          <div className="slideshow">
            <div
              className="z-10 flex slideshowSlider"
              style={{ transform: `translate3d(${-context.index * 100}%, 0, 0)` }}>
              <div className="inline-block w-full p-5 text-left">
                <button
                  onClick={() => context.changeKey('index', 1)}
                  className="border-none focus:outline-none">
                  <label htmlFor="file_banner">
                    <div
                      style={{ width: '550px' }}
                      className="relative flex flex-col items-center justify-center h-40 bg-white border-dashed cursor-pointer border-DEFAULT border-secondary2">
                      {context.file === null && (
                        <div className="absolute z-40 flex flex-col items-center justify-center text-secondary2 font-prompt">
                          <Panorama fontSize="large" />
                          <p className="text-body-2">Browse Banner image</p>
                          <p className="text-body-2">
                            * รูปต้องมีขนาดอัตราส่วนเท่ากับ 3.2 เช่น 1600 x 500 เป็นไฟล์นามสกุล .png
                          </p>
                          <p className="px-5 text-body-2">และไฟล์ต้องมีขนาดไม่เกิน 5MB</p>
                        </div>
                      )}
                      {context.file !== null && (
                        <div
                          style={{ backgroundImage: `url(${context.file})` }}
                          className="w-full h-full bg-cover"
                        />
                      )}
                    </div>
                  </label>
                </button>
                <div style={{ height: '25vh' }} id="scrollbar-custom" className="overflow-y-auto">
                  {_.map(context.banners, (item, i) => {
                    return (
                      <div
                        key={`banner_image_${i}`}
                        className="flex items-center w-full h-16 p-1 my-1 border-opacity-25 gap-x-1 border-DEFAULT border-secondary2">
                        <div
                          style={{
                            backgroundImage: `url(${publicRuntimeConfig.s3_url}/banner/${item.path_image})`
                          }}
                          className="flex-1 w-32 h-full bg-cover"
                        />
                        <div className="flex flex-col text-body-2">
                          <div className="flex ml-1">
                            <p className="font-prompt">ชื่อไฟล์: {item.path_image}</p>
                          </div>
                          <div className="flex ml-1">
                            <p className="font-prompt">
                              แสดง: วันที่{' '}
                              {dayjs(item.date_display_start).format('DD/MM/YYYY HH:mm')} ถึง{' '}
                              {dayjs(item.date_display_end).format('DD/MM/YYYY HH:mm')}
                            </p>
                          </div>
                        </div>
                        <div className="items-end flex-1 mr-1 text-right">
                          <button
                            className="focus:outline-none"
                            onClick={() => {
                              context.changeKey('index', 1),
                                context.getBannerById(item.banner_id),
                                setIsUpdate(true)
                            }}>
                            <NavigateNext fontSize="large" className="cursor-pointer" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="inline-block w-full h-full">
                <div className="flex flex-col h-full pt-5 pl-10">
                  <button
                    className="flex items-center w-full mb-4 focus:outline-none"
                    onClick={() => {
                      context.changeKey('index', 0), setIsUpdate(false)
                    }}>
                    <ArrowBackIos fontSize="default" className="cursor-pointer" />
                    <div className="flex justify-center w-full">
                      <p className="font-prompt text-heading-6">จัดการ Banner</p>
                    </div>
                  </button>
                  {!isUpdate && (
                    <>
                      <button className="border-none focus:outline-none">
                        <label htmlFor="file_banner">
                          <div
                            style={{ width: '550px' }}
                            className="relative flex flex-col items-center justify-center h-40 bg-white border-dashed cursor-pointer border-DEFAULT border-secondary2">
                            {context.file === null && (
                              <div className="absolute z-40 flex flex-col items-center justify-center text-secondary2 font-prompt">
                                <Panorama fontSize="large" />
                                <p className="text-body-2">Browse Banner image</p>
                                <p className="px-5 text-body-2">
                                  * รูปต้องมีขนาดอัตราส่วนเท่ากับ 3.2 เช่น 1600 x 500
                                  เป็นไฟล์นามสกุล .png .jpg
                                </p>
                                <p className="px-5 text-body-2">และไฟล์ต้องมีขนาดไม่เกิน 5MB</p>
                              </div>
                            )}
                            {context.file !== null && (
                              <div
                                style={{ backgroundImage: `url(${context.file})` }}
                                className="w-full h-full bg-cover"
                              />
                            )}
                          </div>
                        </label>
                        <input
                          id="file_banner"
                          name="file_banner"
                          type="file"
                          className="z-50 hidden bg-grey-100"
                          ref={register}
                          onChange={(event) => {
                            handlerImage(event)
                          }}
                        />
                        <input name="path_image" className="hidden" />
                      </button>
                    </>
                  )}
                  {errors.file_banner && (
                    <p className="mt-2 text-red text-body-2">{errors.file_banner.message}</p>
                  )}
                  {isUpdate && (
                    <div
                      style={{
                        backgroundImage: `url(${publicRuntimeConfig.s3_url}/banner/${context.banner.path_image})`
                      }}
                      className="w-full h-48 bg-cover opacity-50">
                      <input
                        id="file_banner"
                        name="file_banner"
                        type="file"
                        className="z-50 hidden bg-grey-100"
                        ref={register}
                        onChange={(event) => {
                          context.changeKey('file', URL.createObjectURL(event.target.files[0]))
                        }}
                      />
                      <input name="path_image" className="hidden" />
                    </div>
                  )}
                  <div className="mt-5">
                    <p className="font-prompt text-body-1">เลือกช่วงเวลาแสดง</p>
                    <div className="flex items-center justify-between mt-5">
                      <TextField
                        variant="outlined"
                        id="date_display_start"
                        name="date_display_start"
                        label="เริ่มแสดง"
                        type="datetime-local"
                        required={true}
                        inputRef={register}
                        error={!!errors.date_display_start}
                        helperText={errors.date_display_start?.message}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                      <p className="mx-3 font-prompt text-heading-6">to</p>
                      <TextField
                        variant="outlined"
                        id="date_display_end"
                        name="date_display_end"
                        label="สิ้นสุดการแสดง"
                        type="datetime-local"
                        required={true}
                        inputRef={register}
                        error={!!errors.date_display_end}
                        helperText={errors.date_display_end?.message}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </div>
                  </div>
                  {isUpdate && (
                    <div className="flex w-full space-x-5">
                      <button
                        id="submit"
                        onClick={handleSubmit(context.deleteBanner)}
                        type="submit"
                        className="w-full p-2 mt-10 mb-6 text-white font-prompt text-body-2 focus:outline-none bg-red">
                        ลบรูปภาพ
                      </button>
                      <button
                        id="submit"
                        onClick={handleSubmit(context.updateBanner)}
                        type="submit"
                        className="w-full p-2 mt-10 mb-6 text-white font-prompt text-body-2 focus:outline-none bg-primary">
                        อัปเดทข้อมูล
                      </button>
                    </div>
                  )}
                  {!isUpdate && (
                    <button
                      id="submit"
                      onClick={handleSubmit(context.uploadBanner)}
                      type="submit"
                      className="w-full p-2 mt-10 mb-6 text-white font-prompt text-body-2 focus:outline-none bg-primary">
                      อัปโหลดรูปภาพ
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </Observer>
  )
}
