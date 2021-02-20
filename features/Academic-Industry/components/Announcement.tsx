import { Business, FileCopy, QueryBuilder } from '@material-ui/icons'
import { Dialog, DialogActions, Card as MaterialCard, Typography } from '@material-ui/core'

import { Observer } from 'mobx-react-lite'
import React from 'react'
import getConfig from 'next/config'
import Link from 'next/link'

const { publicRuntimeConfig } = getConfig()
interface AnnouncementProps {
  className?: string
  tags: Array<string>
  srcImg: string
  title?: string
  date?: string
  company?: string
  linkPath?: string
  context
}

export const Announcement = ({
  className,
  tags,
  srcImg,
  title,
  date,
  company,
  context,
  linkPath
}: AnnouncementProps) => (
  <>
    <MaterialCard
      style={{ height: '199px' }}
      className={`${className} w-full grid grid-cols-12 gap-4`}>
      <div
        className="w-full col-span-3 bg-cover bg-clip-padding"
        style={{
          backgroundImage: `url(${publicRuntimeConfig.s3_url}/logo/${srcImg})`
        }}
      />
      <div className="col-span-8 pt-8 align-middle">
        {linkPath ? (
          <Link href={linkPath}>
            <Typography className="mb-3 ml-1 font-bold text-primary font-prompt text-heading-6 cursor-pointer">
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
        <div className="mt-3 text-black text-body-2">
          <Business className="mb-2 mr-2" />
          <span className="text-subtitle-2">{company}</span>
        </div>
        <div className="text-black text-body-2">
          <QueryBuilder className="mb-2 mr-2" />
          <span className="mt-2 text-subtitle-2">{date}</span>
        </div>
      </div>
      <Observer>
        {() => (
          <>
            <div className="col-span-1 pt-8 pl-5" id="button-application">
              <FileCopy color="action" className="cursor-pointer" onClick={context.handleModal} />
            </div>
            <Dialog open={context.showModal} onClose={context.handleCloseModal} maxWidth={'xs'}>
              <div className="p-4 text-left">
                <p className="mb-3 mr-40 font-prompt-medium text-heading-6">
                  สร้างประกาศใหม่อีกครั้ง
                </p>
                <span className="mb-5 font-prompt text-subtitle-1">
                  คุณต้องการสร้างประกาศรับสมัครชื่อ
                </span>
                <span className="mb-5 font-prompt text-subtitle-1 text-primary">
                  {` ประกาศรับสมัคร Software Engineer 2 อัตรา `}
                </span>
                <span className="mb-5 font-prompt text-subtitle-1">อีกครั้งใช่หรือไม่</span>
                <DialogActions className="mt-4">
                  <button onClick={context.handleCloseModal} className="text-secondary2">
                    <p className="px-5 py-2 font-prompt">ยกเลิก</p>
                  </button>
                  <button className="text-white bg-primary">
                    <p className="px-5 py-2 font-prompt">สร้าง</p>
                  </button>
                </DialogActions>
              </div>
            </Dialog>
          </>
        )}
      </Observer>
    </MaterialCard>
  </>
)
