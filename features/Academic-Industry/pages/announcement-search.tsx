import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  CircularProgress
} from '@material-ui/core'
import { companyType, jobType, status } from '../services/constantVariable'
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
import { AlertContext } from 'core/contexts/alert_context'

const AnnouncementSearch = ({ authContext }) => {
  const context = useContext(announcementSearchPageContext)
  const contextSearch = useContext(searchContext)
  const contextPagination = useContext(paginationContext)
  const alertContext = useContext(AlertContext)

  useEffect(() => {
    context.getAnnouncements()
    contextPagination.setSliceAnnouncement()
    context.setValue('alert', alertContext)
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

  const handlerSearch = () => {
    context.setAnnouncements(
      contextSearch.searchMultiFilterAnnouncement(context.beforeSearch, context.filterSearch)
    )
  }

  return (
    <Observer>
      {() => (
        <div className="max-w-screen-lg pb-4 mx-auto">
          <div
            style={{ width: '1024px' }}
            className="w-full px-10 py-2 mt-20 bg-white rounded-lg shadow-lg font-prompt">
            <div className="w-full my-6">
              <div className="flex flex-row justify-between">
                <div className="w-10/12">
                  <div className="w-full p-2 bg-white border-opacity-50 rounded border-DEFAULT border-secondary2">
                    <Search
                      onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                          handlerSearch()
                        }
                      }}
                      onChange={(event) => {
                        if (typeof event.target.value === 'string') {
                          context.setValue('filterSearch', [
                            { type: 'company_name_en', name: [event.target.value] },
                            { type: 'company_name_th', name: [event.target.value] },
                            { type: 'announcement_title', name: [event.target.value] }
                          ])
                        }
                      }}
                    />
                  </div>
                </div>
                <PrimaryButton
                  title="ค้นหา"
                  className="z-50 ml-5 lg:w-3/12"
                  onClick={handlerSearch}>
                  <p className="px-4 py-4 text-white font-prompt text-subtitle-1">ค้นหา</p>
                </PrimaryButton>
              </div>
              <div className="flex flex-row justify-between pt-6">
                <div className="w-full">
                  <FormControl className="w-full font-prompt" variant="outlined">
                    <InputLabel htmlFor="trinity-select">ประเภทของงาน</InputLabel>
                    <Select
                      labelId="trinity-select"
                      multiple
                      value={context.jobPosition}
                      onChange={(event) => {
                        context.setValue('jobPosition', event?.target?.value)
                        context.setValue('filterSearch', [
                          { type: 'job_position', name: context.jobPosition },
                          { type: 'company_name_en', name: [event.target.value] },
                          { type: 'company_name_th', name: [event.target.value] },
                          { type: 'announcement_title', name: [event.target.value] }
                        ])
                      }}
                      input={<OutlinedInput />}>
                      {_.map(context.jobPositions, (position, i) => (
                        <MenuItem key={i} value={position.job_position}>
                          {position.job_position}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="w-full pl-5">
                  <FormControl className="w-full font-prompt" variant="outlined">
                    <InputLabel htmlFor="trinity-select">ประเภทของประกาศ</InputLabel>
                    <Select
                      labelId="demo-mutiple-name-label"
                      id="demo-mutiple-name"
                      multiple
                      value={context.jobType}
                      onChange={(event) => {
                        context.setValue('jobType', event?.target?.value)
                        context.setValue('filterSearch', [
                          { type: 'job_type', name: context.jobType },
                          { type: 'company_name_en', name: [event.target.value] },
                          { type: 'company_name_th', name: [event.target.value] },
                          { type: 'announcement_title', name: [event.target.value] }
                        ])
                      }}
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
                <div className="w-full pl-5">
                  <FormControl className="w-full font-prompt" variant="outlined">
                    <InputLabel htmlFor="trinity-select">ประเภทของษริษัท</InputLabel>
                    <Select
                      labelId="demo-mutiple-name-label"
                      id="demo-mutiple-name"
                      multiple
                      value={context.companyType}
                      onChange={(event) => {
                        context.setValue('companyType', event?.target?.value)
                        context.setValue('filterSearch', [
                          { type: 'company_type', name: context.companyType },
                          { type: 'company_name_en', name: [event.target.value] },
                          { type: 'company_name_th', name: [event.target.value] },
                          { type: 'announcement_title', name: [event.target.value] }
                        ])
                      }}
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
                {(authContext.roleUser === 'viewer' || authContext.roleUser === 'admin') && (
                  <div className="w-full pl-5">
                    <FormControl className="w-full font-prompt" variant="outlined">
                      <InputLabel htmlFor="trinity-select">สถานะการรับสมัคร</InputLabel>
                      <Select
                        labelId="demo-mutiple-name-label"
                        id="demo-mutiple-name"
                        multiple
                        value={context.status}
                        onChange={(event) => {
                          context.setValue('status', event?.target?.value)
                          context.setValue('filterSearch', [
                            { type: 'status', name: context.status },
                            { type: 'company_name_en', name: [event.target.value] },
                            { type: 'company_name_th', name: [event.target.value] },
                            { type: 'announcement_title', name: [event.target.value] }
                          ])
                        }}
                        input={<OutlinedInput />}
                        MenuProps={MenuProps}>
                        {_.map(status, (status) => (
                          <MenuItem key={status.title} value={status.title}>
                            {status.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                )}
              </div>
            </div>
          </div>
          {context.isLoading ? (
            <div className="flex justify-center w-full mt-8">
              <CircularProgress />
            </div>
          ) : (
            <div className="w-full">
              <div className="mx-auto">
                <div className="flex flex-wrap mt-8">
                  <p className="w-3/4 pb-6 font-semibold font-prompt text-body-1">
                    {`การค้นหา: พบ ${context.announcements.length} ตำแหน่งงาน`}
                  </p>
                  {context.announcements.length !== 0 ? (
                    <>
                      <div className="flex-1">
                        {toJS(context.announcements)
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
                                  tags={[data?.job_position]}
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
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center w-full h-16">
                      <span className="font-prompt text-heading-6">ไม่พบผลลัพธ์</span>
                    </div>
                  )}
                  {context.announcements.length !== 0 && (
                    <div className="flex-1">
                      <AnnouncementDetail data={context.announcementDetail} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Observer>
  )
}
export default AnnouncementSearch
