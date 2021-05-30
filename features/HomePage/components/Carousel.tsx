/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, useContext } from 'react'
import _ from 'lodash'
import Image from 'next/image'
import getConfig from 'next/config'
import { Observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

import { ModalBannerContext } from 'core/contexts/modal_banner_image_context'

const { publicRuntimeConfig } = getConfig()

export const Carousel = () => {
  const [active, setActive] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const context = useContext(ModalBannerContext)
  const ref = useRef(null)

  useEffect(() => {
    context.getBanners()
    if (!isActive) {
      const interval = setInterval(() => {
        setActive((oldValue) => {
          let newValue = oldValue + 1
          if (newValue === context.banners.length) {
            newValue = 0
          }
          return newValue
        })
      }, 4000)
      return () => {
        clearInterval(interval)
      }
    }
  }, [])

  const handlerClick = (i) => {
    setActive(i)
    setIsActive(!isActive)
  }

  return (
    <Observer>
      {() => (
        <div ref={ref} className={`relative z-10 w-full bg-primary h-full mt-12`}>
          <Image
            src={`${publicRuntimeConfig.s3_url}/banner/${
              toJS(context.banners[active])?.path_image
            }`}
            alt="logo"
            layout="responsive"
            width={900}
            height={250}
          />
          <div className="absolute bottom-0 flex flex-row justify-center w-full gap-5 mb-5">
            {_.map(context.banners, (data, i) => {
              return (
                <div key={i}>
                  <button
                    className={`w-5 focus:outline-none h-5 rounded-full cursor-pointer ${
                      active === i ? 'bg-secondary1' : 'bg-white'
                    }`}
                    onClick={() => handlerClick(i)}>
                    <div
                      style={{ filter: 'blur(15px)' }}
                      className="w-4 h-4 bg-white rounded-full"
                    />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </Observer>
  )
}
