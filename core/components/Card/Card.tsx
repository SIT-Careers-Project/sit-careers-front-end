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
    <MaterialCard
      style={{ height: '199px' }}
      className={`${className} w-full grid grid-cols-12 gap-4`}>
      <div
        className="w-full col-span-3 mr-3 bg-cover"
        style={{ backgroundImage: `url(${srcImg})` }}
      />
      <div className="col-span-9 pt-8 align-middle">
        <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
          {title}
        </Typography>
        <div className="mt-2">
          {tags.map((data, i) => (
            <span
              key={i}
              className="px-1 mr-2 text-sm text-white rounded font-prompt text-body-2 bg-primary">
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
