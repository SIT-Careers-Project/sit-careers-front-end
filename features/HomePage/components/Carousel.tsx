import React, { useEffect, useRef, useState } from 'react'

import Image from 'next/image'

export const Carousel = () => {
  const [active, setActive] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const ref = useRef(null)
  const image = [
    {
      path_image:
        'https://www.sit.kmutt.ac.th/wp-content/uploads/2021/02/IAIT-2021-Banner-V3-011-scaled.jpg'
    },
    {
      path_image: 'https://www.sit.kmutt.ac.th/wp-content/uploads/2019/11/banner-thewin.jpg'
    },
    {
      path_image: 'https://www.sit.kmutt.ac.th/wp-content/uploads/2020/08/buildin3.png'
    }
  ]

  useEffect(() => {
    if (!isActive) {
      const interval = setInterval(() => {
        setActive((oldValue) => {
          let newValue = oldValue + 1
          if (newValue === image.length) {
            newValue = 0
          }
          return newValue
        })
      }, 5000)
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
    <div ref={ref.current} className={`relative z-10 w-full bg-primary h-full mt-12`}>
      <Image
        src={image[active]?.path_image}
        alt="logo"
        layout="responsive"
        width={900}
        height={250}
      />
      <div className="absolute bottom-0 flex flex-row justify-center w-full gap-5 mb-5">
        {image.map((data, i) => {
          return (
            <div key={i}>
              <button
                className={`w-5 focus:outline-none h-5 rounded-full cursor-pointer ${
                  active === i ? 'bg-secondary1' : 'bg-white'
                }`}
                onClick={() => handlerClick(i)}>
                <div style={{ filter: 'blur(15px)' }} className="w-4 h-4 bg-white rounded-full" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
