import React, { useContext, useEffect } from 'react'

import { AddCircle } from '@material-ui/icons'
import { Card } from '../../../core/components/Card/Card'
import Link from 'next/link'
import { companyFormPageContext } from '../contexts/company_form_page_context'
import { companyInfoPageContext } from '../contexts/company_info_page_context'
import { useObserver } from 'mobx-react-lite'
import { useRouter } from 'next/router'

const CompanyInfo = () => {
  const context = useContext(companyInfoPageContext)
  const contextForm = useContext(companyFormPageContext)
  const router = useRouter()

  useEffect(() => {
    context.getCompanies()
    contextForm.router = false
  }, [context, contextForm, router])

  return useObserver(() => (
    <div className="w-full max-w-screen-lg mb-16 bg-white">
      <div className="flex justify-between w-full mt-2">
        <div>
          <p className="text-heading-5 font-prompt">จัดการข้อมูลบริษัท</p>
        </div>
        <div>
          <Link href="/company/form-create">
            <button className="bg-primary">
              <p className="px-5 py-2 text-white font-prompt text-subtitle-1">
                <AddCircle className="mr-1" />
                เพิ่มบริษัท
              </p>
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full h-1 mt-4 mb-3 bg-secondary1" />
      {context.companies.map((data, i) => {
        return (
          <Card
            className="my-3"
            key={i}
            title={`${data.company_name_th} - ${data.company_name_en}`}
            tags={data.mou_link ? [`${data.company_type}`, 'MOU'] : [`${data.company_type}`]}
            aboutUs={data.description}
            srcImg="https://i.picsum.photos/id/1000/5626/3635.jpg?hmac=qWh065Fr_M8Oa3sNsdDL8ngWXv2Jb-EE49ZIn6c0P-g"
          />
        )
      })}
    </div>
  ))
}

export default CompanyInfo
