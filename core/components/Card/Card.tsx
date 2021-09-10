import { Card as MaterialCard, Typography } from '@material-ui/core'

import Link from 'next/link'
import React from 'react'
import getConfig from 'next/config'
import marked from 'marked'

const { publicRuntimeConfig } = getConfig()

interface CardProps {
  className?: string
  tags: Array<string>
  srcImg: string
  title?: string
  aboutUs?: string
  linkPath?: string
}

export const Card = ({ className, tags, srcImg, aboutUs, title, linkPath }: CardProps) => (
  <>
    <MaterialCard
      style={{
        height: '199px',
        boxShadow: '10px -3px 15px rgba(0, 0, 0, 0.10), 4px -2px 6px rgba(0, 0, 0, 0.05)'
      }}
      className={`${className} w-full grid grid-cols-12 gap-4`}>
      {srcImg === '-' ? (
        <div className="flex items-center justify-center w-full h-full col-span-3 bg-secondary1">
          <span className="text-white uppercase text-heading-1">
            {title?.split(' - ')[1].substr(0, 1)}
          </span>
        </div>
      ) : (
        <div
          className="w-full col-span-3 mr-3 bg-cover"
          style={{ backgroundImage: `url(${publicRuntimeConfig.s3_url}/logo/${srcImg})` }}
        />
      )}
      <div className="col-span-9 pt-8 align-middle">
        {linkPath ? (
          <Link href={linkPath}>
            <Typography className="mb-3 ml-1 font-bold cursor-pointer text-primary font-prompt text-heading-6">
              {title}
            </Typography>
          </Link>
        ) : (
          <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6">
            {title}
          </Typography>
        )}
        <div className="mt-2">
          {tags.map((data, i) => (
            <span
              key={i}
              className="px-1 mr-2 text-sm text-white rounded font-prompt text-body-2 bg-primary">
              {data}
            </span>
          ))}
        </div>
        <div className="flex mt-2 leading-5 text-black text-body-2">
          <div
            dangerouslySetInnerHTML={{
              __html: marked(aboutUs.substr(0, 150) || '')
            }}
            className="flex-wrap text-black text-subtitle-2"
          />
        </div>
      </div>
    </MaterialCard>
  </>
)
