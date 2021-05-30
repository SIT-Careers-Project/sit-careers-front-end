import { FormControl, InputLabel, MenuItem, Select, OutlinedInput } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { Observer } from 'mobx-react-lite'
import _ from 'lodash'

import { Card } from 'core/components/Card/Card'
import Pagination from 'core/components/Pagination'
import PrimaryButton from 'core/components/Button/Primary'
import Search from 'core/components/Search'
import { companySearchPageContext } from '../contexts/company_search_page_context'
import { paginationContext } from 'core/contexts/pagination_context'
import { searchContext } from 'core/contexts/search_context'
import { companyType } from '../services/constantVariable'

const AllCompany = () => {
  const context = useContext(companySearchPageContext)
  const contextPagination = useContext(paginationContext)
  const contextSearch = useContext(searchContext)

  const keySearch = ['company_type', 'company_name_th', 'company_name_en']

  useEffect(() => {
    context.getCompanies()
    contextPagination.setSliceData()
  }, [context, contextPagination])

  const handlerSearch = () => {
    context.setValue(
      'companies',
      contextSearch.searchMultiFilter(
        [context.companyType, context.companyName],
        context.beforeSearch,
        keySearch
      )
    )
  }

  return (
    <Observer>
      {() => (
        <>
          <div className="container grid max-w-screen-lg grid-flow-row px-10 mx-auto mt-20 bg-white rounded-lg shadow-lg font-prompt">
            <div className="w-full max-w-screen-lg my-6">
              <div className="flex flex-row justify-between">
                <div className="w-6/12 p-2 bg-white border-opacity-50 rounded border-DEFAULT border-secondary2">
                  <Search
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        handlerSearch()
                      }
                    }}
                    onChange={(event) => {
                      if (typeof event.target.value === 'string') {
                        context.setValue('companyName', event.target.value)
                      }
                    }}
                  />
                </div>
                <div className="w-4/12 px-5">
                  <FormControl variant="outlined" className="w-full my-4 font-prompt">
                    <InputLabel htmlFor="trinity-select">ประเภทธุรกิจ</InputLabel>
                    <Select
                      id="trinity-select"
                      multiple
                      value={context.companyType}
                      input={<OutlinedInput />}
                      onChange={(event) => {
                        context.setValue('companyType', event.target.value)
                      }}>
                      {_.map(companyType, (company) => (
                        <MenuItem key={company.title} value={company.title}>
                          {company.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <PrimaryButton className="lg:w-2/6" title="ค้นหา" onClick={handlerSearch}>
                  <p className="text-white font-prompt text-subtitle-1">ค้นหา</p>
                </PrimaryButton>
              </div>
            </div>
          </div>
          <div className="container grid max-w-screen-lg grid-flow-row mx-auto mt-5">
            <div>
              <p className="text-heading-5 font-prompt">ข้อมูลบริษัท</p>
            </div>
            <div className="mb-5">
              {context.companies.length !== 0 ? (
                <>
                  {context.companies
                    .slice(contextPagination.sliceDataStart, contextPagination.sliceDataEnd)
                    .map((data, i) => {
                      return (
                        <Card
                          className="my-5"
                          key={i}
                          title={`${data.company_name_th} - ${data.company_name_en}`}
                          linkPath={`/company/detail/${data.company_id}`}
                          tags={
                            data.mou_link
                              ? [`${data.company_type}`, 'MOU']
                              : [`${data.company_type}`]
                          }
                          aboutUs={data.about_us}
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
        </>
      )}
    </Observer>
  )
}
export default AllCompany
