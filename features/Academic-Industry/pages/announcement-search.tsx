import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { companyType, jobType } from '../services/constantVariable'
import { CardSmall } from '../../../core/components/Card/Small'
import PrimaryButton from '../../../core/components/Button/Primary'
import React, { useContext, useEffect } from 'react'
import Search from '../../../core/components/Search'
import { Observer } from 'mobx-react-lite'
import { announcementSearchPageContext } from '../context/announcement_search_page_context'
import { searchContext } from '../../../core/contexts/search_context'
import { paginationContext } from '../../../core/contexts/pagination_context'
import Pagination from '../../../core/components/Pagination'
import { AnnouncementDetail } from '../components/AnnouncementDetail'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const AnnouncementSearch = () => {
  const context = useContext(announcementSearchPageContext)
  const contextSearch = useContext(searchContext)
  const contextPagination = useContext(paginationContext)

  useEffect(() => {
    context.getAnnouncements()
    contextPagination.setSliceAnnouncement()
    context.setValue('announcementDetail', context.announcements[0])
  }, [context, contextPagination])

  return (
    <Observer>
      {() => (
        <div>
          <div className="flex justify-center w-full h-full pt-16 pb-3 bg-grey4">
            <div className="w-full max-w-screen-lg my-6">
              <div className="w-full h-8 max-w-screen-lg bg-grey-100">
                <Search
                  onChange={(event) => {
                    if (typeof event.target.value === 'string') {
                      context.setValue('companyName', event.target.value)
                      context.setValue('announcementTitle', event.target.value)
                    }
                  }}
                />
              </div>
              <div className="flex flex-row justify-between pt-6">
                <div className="w-3/12 pr-5">
                  <FormControl className="w-full font-prompt bg-grey-100">
                    <InputLabel htmlFor="trinity-select">ประเภทของงาน</InputLabel>
                    <Select
                      id="trinity-select"
                      name="job_position"
                      onChange={(event) => {
                        if (typeof event.target.value === 'string') {
                          context.setValue('jobPosition', event.target.value)
                        }
                      }}>
                      {context.jobPositions.map((position, i) => (
                        <MenuItem key={i} value={position.job_position}>
                          {position.job_position}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="w-3/12 pl-6 pr-5">
                  <FormControl className="w-full font-prompt bg-grey-100">
                    <InputLabel htmlFor="trinity-select">ประเภทของประกาศ</InputLabel>
                    <Select
                      id="trinity-select"
                      name="job_type"
                      onChange={(event) => {
                        if (typeof event.target.value === 'string') {
                          context.setValue('jobType', event.target.value)
                        }
                      }}>
                      {jobType.map((job) => (
                        <MenuItem key={job.title} value={job.title}>
                          {job.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="w-3/12 pl-6 pr-5">
                  <FormControl className="w-full font-prompt bg-grey-100">
                    <InputLabel htmlFor="trinity-select">ประเภทของษริษัท</InputLabel>
                    <Select
                      id="trinity-select"
                      name="company_type"
                      onChange={(event) => {
                        if (typeof event.target.value === 'string') {
                          context.setValue('companyType', event.target.value)
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
                  title="ค้นหา"
                  className="z-50 ml-10 lg:w-2/6"
                  onClick={() => {
                    if (
                      typeof (
                        context.companyType ||
                        context.companyName ||
                        context.announcementTitle ||
                        context.jobPosition ||
                        context.jobType
                      ) === 'string'
                    ) {
                      const keySearch = [
                        'company_type',
                        'company_name_th',
                        'company_name_en',
                        'announcement_title',
                        'job_position',
                        'job_type'
                      ]
                      context.setAnnouncements(
                        contextSearch.searchMultiFilter(
                          [
                            context.companyType +
                              ' ' +
                              context.companyName +
                              ' ' +
                              context.announcementTitle +
                              ' ' +
                              context.jobPosition +
                              ' ' +
                              context.jobType
                          ],
                          context.beforeSearch,
                          keySearch
                        )
                      )
                    }
                  }}>
                  <p className="px-4 py-4 text-white font-prompt text-subtitle-1">ค้นหา</p>
                </PrimaryButton>
              </div>
            </div>
          </div>
          <div className="w-full h-1 bg-secondary1" />
          <div className="flex justify-center w-full h-full pb-10">
            <div className="-mt-24">
              <div className="container px-32 mx-auto">
                <div className="flex flex-wrap mt-32">
                  <p className="w-3/4 pb-6 font-semibold font-prompt text-body-1">
                    {`การค้นหา: พบ ${context.announcements.length} ตำแหน่งงาน`}
                  </p>
                  <div className="w-full mr-5 md:w-5/12">
                    {context.announcements.length !== 0 ? (
                      <>
                        {context.announcements
                          .slice(contextPagination.sliceDataStart, contextPagination.sliceDataEnd)
                          .map((data, i) => {
                            return (
                              <div className="pb-5" key={i}>
                                <CardSmall
                                  title={data.announcement_title}
                                  tags={[data.job_position, data.job_type, data.status]}
                                  date={`${data.start_date} - ${data.end_date}`}
                                  company={`${data.company_name_th} - ${data.company_name_en}`}
                                  srcImg={`${publicRuntimeConfig.s3_url}/logo/${data.logo}`}
                                  onClick={() => context.setValue('announcementDetail', data)}
                                />
                              </div>
                            )
                          })}
                        <Pagination data={context.announcements} />
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full h-16">
                        <span className="font-prompt text-heading-6">ไม่พบผลลัพธ์</span>
                      </div>
                    )}
                  </div>
                  <AnnouncementDetail data={context.announcementDetail} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  )
}
export default AnnouncementSearch
