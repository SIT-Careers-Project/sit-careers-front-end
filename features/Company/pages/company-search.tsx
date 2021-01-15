import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'

import { Card } from '../../../core/components/Card/Card'
import Pagination from '../../../core/components/Pagination'
import Search from '../../../core/components/Search'
import { companySearchPageContext } from '../contexts/company_search_page_context'
import { paginationContext } from '../../../core/contexts/pagination_context'
import { searchContext } from '../../../core/contexts/search_context'
import { useObserver } from 'mobx-react-lite'

const AllCompany = () => {
  const context = useContext(companySearchPageContext)
  const contextPagination = useContext(paginationContext)
  const contextSearch = useContext(searchContext)
  const companyType = [
    { title: 'Software House' },
    { title: 'Technology Consultant' },
    { title: 'Big data' },
    { title: 'DevOps' },
    { title: 'Cloud' }
  ]

  useEffect(() => {
    context.getCompanies()
    contextPagination.setSliceData()
  }, [context, contextPagination])

  return useObserver(() => (
    <div>
      <div
        className="relative flex items-center content-center justify-center pt-16 pb-32"
        style={{
          minHeight: '60vh'
        }}>
        <div className="absolute top-0 w-full h-full bg-center bg-cover">
          <img
            alt="company"
            src="/image/view-modern-business-skyscrapers-glass-sky-view-landscape-commercial-building.jpg"
            className="absolute top-0 w-full h-full bg-center bg-cover"
          />
          <span id="blackOverlay" className="absolute w-full h-full bg-black opacity-75"></span>
        </div>
        <div className="container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-full ml-auto mr-auto lg:w-5/12">
              <div className="mb-5 lg:w-11/12 bg-grey-100">
                <Search
                  onChange={(event) => {
                    if (typeof event.target.value === 'string') {
                      context.setCompanyName(event.target.value)
                    }
                  }}
                />
              </div>
              <div>
                <FormControl variant="filled" className="lg:w-3/6 font-prompt bg-grey-100">
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
                <button
                  className="ml-10 bg-secondary1 lg:w-2/6"
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
                  <p className="px-4 py-4 text-white font-prompt text-subtitle-1">ค้นหา</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
