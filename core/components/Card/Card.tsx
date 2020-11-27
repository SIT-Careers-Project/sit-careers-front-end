import { Card as MaterialCard, Typography } from '@material-ui/core'

import React from 'react'

interface CardProps {
  className?: string
  tags: Array<string>
  srcImg: string
  title?: string
  aboutUs?: string
}

export const Card = ({ className, tags, srcImg, aboutUs, title }: CardProps) => (
  <>
    <MaterialCard style={{ height: '199px' }} className={`${className} w-full flex pr-4`}>
      <div className="w-1/3 mr-3">
        <img src={srcImg} alt="Normal Card" />
      </div>
      <div className="my-6 align-middle">
        <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
          {title}
        </Typography>
        <div className="mt-2">
          {tags.map((data, i) => (
            <span
              key={i}
              className="px-1 mr-2 text-sm font-normal text-black bg-opacity-50 rounded text-body-2 bg-secondary2">
              {data}
            </span>
          ))}
        </div>
        <div className="mt-2 text-black text-body-2">
          <span className="text-subtitle-2">{aboutUs}</span>
        </div>
      </div>
    </MaterialCard>
  </>
)
