import { Business, QueryBuilder } from '@material-ui/icons'
import { Card as MaterialCard, Typography } from '@material-ui/core'

import React from 'react'

interface CardProps {
  className?: string
  tags: Array<string>
  srcImg: string
  title?: string
  date?: string
  company?: string
}

export const CardSmall = ({ className, tags, srcImg, title, date, company }: CardProps) => (
  <div className="pb-3">
    <MaterialCard style={{ height: '163px' }} className={`${className} flex p-2`}>
      <div className="mr-3">
        <img width="80px" src={srcImg} alt="Small Card" />
      </div>
      <div className="align-middle">
        <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
          {title}
        </Typography>
        {tags.map((data, i) => (
          <span
            key={i}
            className="px-1 mr-2 text-sm font-normal text-black bg-opacity-50 rounded text-body-2 bg-secondary2">
            {data}
          </span>
        ))}
        <br />
        <div className="mt-1 text-black text-body-2">
          <Business className="mb-2 mr-2" />
          <span className="text-subtitle-2">{company}</span>
        </div>
        <div className="text-black text-body-2">
          <QueryBuilder className="mb-2 mr-2" />
          <span className="mt-2 text-subtitle-2">{date}</span>
        </div>
      </div>
    </MaterialCard>
  </div>
)
