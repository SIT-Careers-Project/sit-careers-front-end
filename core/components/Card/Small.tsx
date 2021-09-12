import { Business, QueryBuilder } from '@material-ui/icons'

import { Card as MaterialCard } from '@material-ui/core'
import React from 'react'
import { TagStatus } from '../TagStatus'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
interface CardProps {
  className?: string
  tags: Array<string>
  srcImg: string
  title?: string
  date?: string
  company?: string
  status?: string
  onClick?
}

export const CardSmall = ({
  className,
  tags,
  srcImg,
  title,
  date,
  status,
  company,
  onClick
}: CardProps) => (
  <div>
    <MaterialCard
      onClick={onClick}
      style={{
        height: '201px',
        width: '403px',
        boxShadow: '10px -3px 15px rgba(0, 0, 0, 0.10), 4px -2px 6px rgba(0, 0, 0, 0.05)'
      }}
      className={`${className} grid grid-cols-4 p-4 gap-4`}>
      <div style={{ height: '80px' }} className="col-span-1">
        {srcImg !== '-' && (
          <div
            className="w-full h-full col-span-3 bg-cover bg-clip-padding"
            style={{
              backgroundImage: `url(${publicRuntimeConfig.s3_url}/logo/${srcImg})`
            }}
          />
        )}
        {srcImg === '-' && (
          <div className="flex items-center justify-center w-full h-full col-span-3 text-white bg-cover text-heading-4 bg-clip-padding bg-secondary1">
            {company.split(' ')[company.split(' ').indexOf('-') + 1].substr(0, 1)}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-start col-span-3">
        <p className="mb-2 font-bold leading-5 font-prompt text-primary text-heading-6">{title}</p>
        <div>
          <TagStatus status={status} />
          {tags.map((data, i) => (
            <div
              key={i}
              className="inline-block px-1 mt-1 mr-2 text-sm font-normal text-white rounded text-body-2 bg-primary">
              {data}
            </div>
          ))}
        </div>
        <div className="mt-1 leading-3 text-black text-body-2">
          <Business className="mb-2 mr-2" />
          <span className="text-body-1">{company}</span>
        </div>
        <div className="leading-3 text-black text-body-2">
          <QueryBuilder className="mb-2 mr-2" />
          <span className="text-body-1">{date}</span>
        </div>
      </div>
    </MaterialCard>
  </div>
)
