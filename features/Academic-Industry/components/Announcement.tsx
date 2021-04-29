import { Business, QueryBuilder } from '@material-ui/icons'
import { Card as MaterialCard, Typography } from '@material-ui/core'
import React from 'react'
import getConfig from 'next/config'
import Link from 'next/link'
import { TagStatus } from 'core/components/TagStatus'

const { publicRuntimeConfig } = getConfig()
interface AnnouncementProps {
  className?: string
  tags: Array<string>
  srcImg: string
  title?: string
  date?: string
  company?: string
  linkPath?: string
  status?: string
}

export const Announcement = ({
  className,
  tags,
  status,
  srcImg,
  title,
  date,
  company,
  linkPath
}: AnnouncementProps) => (
  <>
    <MaterialCard
      style={{ height: '199px' }}
      className={`${className} w-full grid grid-cols-12 gap-4`}>
      {srcImg !== '-' && (
        <div
          className="w-full col-span-3 bg-cover bg-clip-padding"
          style={{
            backgroundImage: `url(${publicRuntimeConfig.s3_url}/logo/${srcImg})`
          }}
        />
      )}
      {srcImg === '-' && (
        <div className="flex items-center justify-center w-full h-full col-span-3 text-white bg-cover text-heading-1 bg-clip-padding bg-secondary1">
          {company.split(' ')[company.split(' ').indexOf('-') + 1].substr(0, 1)}
        </div>
      )}
      <div className="col-span-8 pt-8 align-middle">
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
          <TagStatus status={status} />
          {tags.map((data, i) => (
            <span
              key={i}
              className="px-1 mr-2 text-sm text-white rounded font-prompt text-body-2 bg-primary">
              {data}
            </span>
          ))}
        </div>
        <div className="mt-3 text-black text-body-2">
          <Business className="mb-2 mr-2" />
          <span className="text-subtitle-2">{company}</span>
        </div>
        <div className="text-black text-body-2">
          <QueryBuilder className="mb-2 mr-2" />
          <span className="mt-2 text-subtitle-2">{date}</span>
        </div>
      </div>
    </MaterialCard>
  </>
)
