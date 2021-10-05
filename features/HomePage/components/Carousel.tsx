/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState, useContext } from 'react'
import _ from 'lodash'
import getConfig from 'next/config'
import { Observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

import { ModalBannerContext } from 'core/contexts/modal_banner_image_context'
import classNames from 'classnames'

const { publicRuntimeConfig } = getConfig()

export const Carousel = () => {
  const context = useContext(ModalBannerContext)
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef(null)
  const delay = 2500
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === context.bannerForShow?.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    )

    return () => {
      resetTimeout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  return (
    <Observer>
      {() => (
        <div className="relative pt-10 slideshow">
          <div className="absolute bottom-0 z-50 flex justify-center w-full mb-10 slideshowDots">
            {_.map(context.bannerForShow, (img, idx) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <div
                key={idx}
                className={`slideshowDot ${index === idx ? 'active' : 'bg-white'}`}
                onClick={() => {
                  setIndex(idx)
                }}
              />
            ))}
          </div>
          <div
            className={classNames('z-10 transition-all duration-1000 opacity-100 slideshowSlider', {
              '2xl:h-470 3xl:h-600 xl:h-400 lg:h-370 sm:h-280 h-200': context.bannerForShow.length
            })}
            style={{
              transform: `translate3d(${-index * 100}%, 0, 0)`
            }}>
            {_.map(toJS(context.bannerForShow), (bgImage, i) => (
              <img
                key={`image_banner_slide_${i}`}
                loading="lazy"
                className="inline-block object-contain w-full"
                src={`${publicRuntimeConfig.s3_url}/banner/${bgImage.path_image}`}
                alt={`Banners ${bgImage.path_image} SIT Careers Center.`}
              />
            ))}
          </div>
        </div>
      )}
    </Observer>
  )
}
