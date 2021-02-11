import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'

import { Card } from '../../../core/components/Card/Card'
import Pagination from '../../../core/components/Pagination'
import PrimaryButton from '../../../core/components/Button/Primary'
import Search from '../../../core/components/Search'
import { companySearchPageContext } from '../contexts/company_search_page_context'
import { paginationContext } from '../../../core/contexts/pagination_context'
import { searchContext } from '../../../core/contexts/search_context'
import { useObserver } from 'mobx-react-lite'
import { companyType } from '../services/constantVariable'

const AllCompany = () => {
  const context = useContext(companySearchPageContext)
  const contextPagination = useContext(paginationContext)
  const contextSearch = useContext(searchContext)

  useEffect(() => {
    context.getCompanies()
    contextPagination.setSliceData()
  }, [context, contextPagination])

  return useObserver(() => (
    <div>
      <div className="flex justify-center w-full h-full pt-16 pb-3 bg-grey4">
        <div className="w-full max-w-screen-lg my-6">
          <div className="flex flex-row justify-between pt-6">
            <div className="p-2 w-6/12 bg-grey-100">
              <Search
                onChange={(event) => {
                  if (typeof event.target.value === 'string') {
                    context.setCompanyName(event.target.value)
                  }
                }}
              />
            </div>
            <div className="w-4/12 px-5">
              <FormControl className="w-full font-prompt bg-grey-100 my-4">
                <InputLabel htmlFor="trinity-select">ประเภทธุรกิจ</InputLabel>
                <Select
                  id="trinity-select"
                  onChange={(event) => {
                    if (typeof event.target.value === 'string') {
                      context.setCompanyType(event.target.value)
                    }
                  }}>
                  {companyType.map((company) => (
                    <MenuItem key={company.title} value={company.title}>
                      {company.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <PrimaryButton
              className="lg:w-2/6"
              title="ค้นหา"
              onClick={() => {
                if (typeof context.companyType || context.companyName === 'string') {
                  const keySearch = ['company_type', 'company_name_th', 'company_name_en']
                  context.setCompanies(
                    contextSearch.searchMultiFilter(
                      [context.companyType + ' ' + context.companyName],
                      context.beforeSearch,
                      keySearch
                    )
                  )
                }
              }}>
              <p className="text-white font-prompt text-subtitle-1">ค้นหา</p>
            </PrimaryButton>
          </div>
        </div>
      </div>
      <div className="w-full h-1 bg-secondary1" />
      <div className="container grid max-w-screen-lg grid-flow-row mx-auto mt-5">
        <div>
          <p className="mb-5 text-heading-5 font-prompt">ข้อมูลบริษัท</p>
        </div>
        <div className="mb-5">
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
                      linkPath={`/company/detail/${data.company_id}`}
                      tags={
                        data.mou_link ? [`${data.company_type}`, 'MOU'] : [`${data.company_type}`]
                      }
                      aboutUs={data.description}
                      srcImg={data.logo}
                    />
                  )
                })}
              <Pagination data={context.companies} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-16">
              <span className="font-prompt text-heading-6">ไม่พบผลลัพธ์</span>
            </div>
          )}
        </div>
      </div>
    </div>
  ))
}
export default AllCompany
