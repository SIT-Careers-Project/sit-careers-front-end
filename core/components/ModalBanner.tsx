import React, { useContext, useCallback, useEffect } from 'react'
import getConfig from 'next/config'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import _ from 'lodash'
import dayjs from 'dayjs'
import { Dialog } from '@material-ui/core'
import { Panorama, Close } from '@material-ui/icons'
import { Observer } from 'mobx-react-lite'

import { navbarContext } from '../contexts/navbar_context'
import { ModalBannerContext } from '../contexts/modal_banner_image_context'

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
    }),
  path_image: yup.string()
})

export const ModalBanner = () => {
  const contextNavbar = useContext(navbarContext)
  const context = useContext(ModalBannerContext)

  useCallback(() => {
    context.banners
  }, [context.banners])

  useEffect(() => {
    context.getBanners()
  }, [context])

  const { handleSubmit, register } = useForm({
    resolver: yupResolver(ModalBannerValidation),
    defaultValues: { ...context.banners }
  })

  return (
    <Observer>
      {() => (
        <Dialog
          open={contextNavbar.isOpenModalBanner}
          onClose={() => contextNavbar.changeKey('isOpenModalBanner', false)}>
          <div data-cy="core-modal-banner" className="w-full p-5 text-left">
            <div>
              <button className="border-none focus:outline-none">
                <label htmlFor="file_banner">
                  <div
                    style={{ width: '550px' }}
                    className="relative flex flex-col items-center justify-center h-40 bg-white border-dashed cursor-pointer border-DEFAULT border-secondary2">
                    {context.file === null && (
                      <div className="absolute z-40 flex flex-col items-center justify-center text-secondary2 font-prompt">
                        <Panorama fontSize="large" />
                        <p className="text-body-2">Browse Banner image</p>
                        <p className="text-body-2">
                          รูปต้องมีขนาด 1600 x 500 เป็นไฟล์นามสกุล .png .jpg
                        </p>
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
                    context.changeKey('file', URL.createObjectURL(event.target.files[0]))
                  }}
                />
                <input name="path_image" className="hidden" />
              </button>
            </div>
            <div style={{ height: '25vh' }} id="scrollbar-custom" className="overflow-y-auto">
              {_.map(context.banners, (item, i) => {
                return (
                  <div
                    key={i}
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
                          อัพโหลด: เมื่อวันที่ {dayjs(item.created_at).format('DD MMM YYYY')}
                        </p>
                      </div>
                    </div>
                    <div className="items-end flex-1 mr-1 text-right">
                      <button
                        className="focus:outline-none"
                        onClick={() => context.deleteBanner(item.path_image, item.banner_id)}>
                        <Close fontSize="large" className="cursor-pointer text-red" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
            <button
              id="submit"
              onClick={handleSubmit(context.uploadBanner)}
              type="submit"
              className="w-full p-2 text-white font-prompt text-body-2 focus:outline-none bg-primary">
              อัพโหลดรูปภาพ
            </button>
          </div>
        </Dialog>
      )}
    </Observer>
  )
}
