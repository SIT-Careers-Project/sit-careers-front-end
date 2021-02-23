import { Business, QueryBuilder } from '@material-ui/icons'

import { Card as MaterialCard } from '@material-ui/core'
import React from 'react'

interface CardProps {
  className?: string
  tags: Array<string>
  srcImg: string
  title?: string
  date?: string
  company?: string
  onClick
}

export const CardSmall = ({
  className,
  tags,
  srcImg,
  title,
  date,
  company,
  onClick
}: CardProps) => (
  <div>
    <MaterialCard
      onClick={() => onClick()}
      style={{ height: '201px', width: '403px' }}
      className={`${className} grid grid-cols-4 p-4 gap-4`}>
      <div className="col-span-1">
        <img width="80px" src={srcImg} alt="Small Card" />
      </div>
      <div className="col-span-3 align-middle">
        <p className="mb-3 font-bold leading-6 font-prompt text-primary text-heading-6">{title}</p>
        {tags.map((data, i) => (
          <span
            key={i}
            className="px-1 mr-2 text-sm font-normal text-white rounded text-body-2 bg-primary">
            {data}
          </span>
        ))}
        <br />
        <div className="mt-1 text-black text-body-2">
          <Business className="mb-2 mr-2" />
          <span className="text-body-1">{company}</span>
        </div>
        <div className="text-black text-body-2">
          <QueryBuilder className="mb-2 mr-2" />
          <span className="text-body-1">{date}</span>
        </div>
      </div>
    </MaterialCard>
  </div>
)
