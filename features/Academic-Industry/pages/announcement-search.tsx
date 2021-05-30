import { FormControl, InputLabel, MenuItem, Select, OutlinedInput } from '@material-ui/core'
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
import { checkStatus } from '../../../core/services/utils'
import dayjs from 'dayjs'
import _ from 'lodash'
import { toJS } from 'mobx'

const AnnouncementSearch = () => {
  const context = useContext(announcementSearchPageContext)
  const contextSearch = useContext(searchContext)
  const contextPagination = useContext(paginationContext)

  useEffect(() => {
    context.getAnnouncements()
    contextPagination.setSliceAnnouncement()
    context.setValue('announcementDetail', context.announcements[0])
  }, [context, contextPagination])

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  }

  const keySearch = [
    'company_type',
    'company_name_th',
    'company_name_en',
    'announcement_title',
    'job_position',
    'job_type'
  ]

  const handlerSearch = () => {
    context.setAnnouncements(
      contextSearch.searchMultiFilter(
        [
          toJS(context.companyType),
          context.companyName,
          context.announcementTitle,
          toJS(context.jobPosition),
          toJS(context.jobType)
        ],
        context.beforeSearch,
        keySearch
      )
    )
  }

  return (
    <Observer>
      {() => (
        <div>
          <div className="container grid max-w-screen-lg grid-flow-row px-10 mx-auto mt-20 bg-white rounded-lg shadow-lg font-prompt">
            <div className="w-full max-w-screen-lg my-6">
              <div className="w-full p-2 bg-white border-opacity-50 rounded border-DEFAULT border-secondary2">
                <Search
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      handlerSearch()
                    }
                  }}
                  onChange={(event) => {
                    if (typeof event.target.value === 'string') {
                      context.setValue('companyName', event.target.value)
                      context.setValue('announcementTitle', event.target.value)
                    }
                  }}
                />
              </div>
              <div className="flex flex-row justify-between pt-6">
                <div className="w-3/12">
                  <FormControl className="w-full font-prompt" variant="outlined">
                    <InputLabel htmlFor="trinity-select">ประเภทของงาน</InputLabel>
                    <Select
                      labelId="trinity-select"
                      multiple
                      value={context.jobPosition}
                      onChange={(event) => context.setValue('jobPosition', event?.target?.value)}
                      input={<OutlinedInput />}>
                      {_.map(context.jobPositions, (position, i) => (
                        <MenuItem key={i} value={position.job_position}>
                          {position.job_position}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="w-3/12 pl-5">
                  <FormControl className="w-full font-prompt" variant="outlined">
                    <InputLabel htmlFor="trinity-select">ประเภทของประกาศ</InputLabel>
                    <Select
                      labelId="demo-mutiple-name-label"
                      id="demo-mutiple-name"
                      multiple
                      value={context.jobType}
                      onChange={(event) => context.setValue('jobType', event?.target?.value)}
                      input={<OutlinedInput />}
                      MenuProps={MenuProps}>
                      {_.map(jobType, (job) => (
                        <MenuItem key={job.title} value={job.title}>
                          {job.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="w-3/12 pl-5">
                  <FormControl className="w-full font-prompt" variant="outlined">
                    <InputLabel htmlFor="trinity-select">ประเภทของษริษัท</InputLabel>
                    <Select
                      labelId="demo-mutiple-name-label"
                      id="demo-mutiple-name"
                      multiple
                      value={context.companyType}
                      onChange={(event) => context.setValue('companyType', event?.target?.value)}
                      input={<OutlinedInput />}
                      MenuProps={MenuProps}>
                      {_.map(companyType, (company) => (
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
                  onClick={handlerSearch}>
                  <p className="px-4 py-4 text-white font-prompt text-subtitle-1">ค้นหา</p>
                </PrimaryButton>
              </div>
            </div>
          </div>
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
                              <div className="pb-5 cursor-pointer" key={i}>
                                <CardSmall
                                  title={data?.announcement_title}
                                  status={checkStatus(
                                    data?.start_date,
                                    data?.end_date,
                                    data?.status
                                  )}
                                  tags={[data?.job_position, data?.job_type]}
                                  date={`${dayjs(data?.start_date)
                                    .locale('th')
                                    .add(543, 'year')
                                    .format('DD MMMM')} - ${dayjs(data?.end_date)
                                    .locale('th')
                                    .add(543, 'year')
                                    .format('DD MMMM YYYY')}`}
                                  company={`${data?.company_name_th} - ${data?.company_name_en}`}
                                  srcImg={data?.logo}
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
