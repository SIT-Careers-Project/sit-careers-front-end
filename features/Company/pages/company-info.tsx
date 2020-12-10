import React, { useContext, useEffect } from 'react'

import { AddCircle } from '@material-ui/icons'
import { Card } from '../../../core/components/Card/Card'
import Link from 'next/link'
import Pagination from '../../../core/components/Pagination'
import Search from '../../../core/components/Search'
import { companyFormPageContext } from '../contexts/company_form_page_context'
import { companyInfoPageContext } from '../contexts/company_info_page_context'
import { paginationContext } from '../../../core/contexts/pagination_context'
import { searchContext } from '../../../core/contexts/search_context'
import { useObserver } from 'mobx-react-lite'

const CompanyInfo = () => {
  const context = useContext(companyInfoPageContext)
  const contextForm = useContext(companyFormPageContext)
  const contextPagination = useContext(paginationContext)
  const contextSearch = useContext(searchContext)

  useEffect(() => {
    context.getCompanies()
    contextForm.router = false
    contextPagination.setSliceData()
  }, [context, contextForm, contextPagination])

  return useObserver(() => (
    <div className="w-full h-full max-w-screen-lg mb-16 bg-white">
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
      <div className="w-full h-8 bg-grey-100">
        <Search
          onChange={(event) => {
            if (typeof event.target.value === 'string') {
              const keySearch = ['company_name_th', 'company_name_en']
              context.setCompanies(
                contextSearch.setSearchItems([event.target.value], context.beforeSearch, keySearch)
              )
            }
          }}
        />
      </div>
      {context.companies.length !== 0 ? (
        <>
          {context.companies
            .slice(contextPagination.sliceDataStart, contextPagination.sliceDataEnd)
            .map((data, i) => {
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
          <Pagination data={context.companies} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-16">
          <span className="font-prompt text-heading-6">ไม่พบผลการค้นหา</span>
        </div>
      )}
    </div>
  ))
}

export default CompanyInfo
