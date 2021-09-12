import React, { useContext, useEffect } from 'react'

import { AnnouncementCardSection } from '../components/AnnouncementCardSection'
import Link from 'next/link'
import { Observer } from 'mobx-react-lite'
import { companyDetailPageContext } from '../contexts/company_detail_page_context'
import getConfig from 'next/config'
import marked from 'marked'
import { CircularProgress } from '@material-ui/core'

type CompanyDetailProps = {
  companyId: string
}

const { publicRuntimeConfig } = getConfig()

const CompanyDetail = ({ companyId }: CompanyDetailProps) => {
  const context = useContext(companyDetailPageContext)

  useEffect(() => {
    context.getCompany(companyId)
    context.getAnnouncements(companyId)
  }, [companyId, context, context.company])

  if (context.isLoading) {
    return (
      <div className="flex justify-center pt-20">
        <CircularProgress />
      </div>
    )
  } else {
    return (
      <Observer>
        {() => (
          <div className="flex flex-col w-full h-full max-w-5xl pt-10 mx-auto">
            <div className="grid grid-cols-12">
              <div className="col-span-3">
                {context?.company?.logo === '-' && (
                  <div className="flex items-center justify-center w-40 h-40 rounded-full bg-secondary1">
                    <span className="text-white uppercase text-heading-1">
                      {context?.company?.company_name_en.substr(0, 1)}
                    </span>
                  </div>
                )}
                {context?.company?.logo !== '-' && (
                  <img
                    alt="logo of company"
                    className="w-40 h-40 rounded-full bg-grey-100"
                    src={`${publicRuntimeConfig.s3_url}/logo/${context?.company?.logo}`}
                  />
                )}
              </div>
              <div className="col-span-9">
                <div className="mb-4 font-bold text-primary font-prompt text-heading-6 md:w-full">
                  {context?.company.company_name_th} - {context?.company.company_name_en}
                </div>
                <span className="px-1 mr-2 text-sm text-white rounded font-prompt text-body-2 bg-primary">
                  {context?.company?.company_type}
                </span>
                <div className="w-full h-1 mt-4 mb-3 bg-secondary1" />
                <div className="w-full pr-2 mt-3 mb-4">
                  <p className="font-semibold font-prompt text-body-1">แนะนำบริษัท</p>
                  <div className="mt-2 prose text-black text-body-1 font-prompt">
                    <div
                      className="flex-wrap prose text-black text-body-1 font-prompt"
                      dangerouslySetInnerHTML={{
                        __html: marked(context?.company?.about_us || '')
                      }}></div>
                  </div>
                </div>
                <div className="w-full mb-4">
                  <p className="font-semibold font-prompt text-body-1">รายละเอียด</p>
                  <div
                    className="flex-wrap prose text-black text-body-1 font-prompt"
                    dangerouslySetInnerHTML={{
                      __html: marked(context?.company?.description || '')
                    }}></div>
                </div>
                <div className="mb-4 md:w-full">
                  <div className="font-semibold font-prompt text-body-1">ที่อยู่</div>
                  <div className="mt-2 text-body-1 font-prompt">
                    {context?.company?.address_one} {context?.company?.lane}{' '}
                    {context?.company?.road}
                    {context?.company?.district} {context?.company?.sub_district}
                    {context?.company?.province} {context?.company?.postal_code}
                  </div>
                </div>
                <div className="mt-3 mb-4 md:w-full">
                  <div className="font-semibold font-prompt text-body-1">วันที่ทำการ</div>
                  <div className="mt-2 text-body-1 font-prompt">
                    {context?.company?.start_business_day} - {context?.company?.end_business_day}{' '}
                    เวลา {context?.company?.start_business_time} -{' '}
                    {context?.company?.end_business_time} น.
                  </div>
                </div>
                <div className="mt-3 mb-4 md:w-full">
                  <div className="font-semibold font-prompt text-body-1">เว็บไซต์</div>
                  {context?.company?.website !== '-' ? (
                    <Link href={`${context?.company?.website}`}>
                      <div className="mt-2 cursor-pointer text-body-1 text-primary font-prompt">
                        {context?.company?.website}
                      </div>
                    </Link>
                  ) : (
                    <div className="mt-2 text-body-1 font-prompt">{context?.company?.website}</div>
                  )}
                </div>
              </div>
            </div>
            <AnnouncementCardSection announcements={context.announcements} />
          </div>
        )}
      </Observer>
    )
  }
}

export default CompanyDetail
