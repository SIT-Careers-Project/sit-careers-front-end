import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { AutoComplete } from 'core/components/AutoComplete'
import { Controller } from 'react-hook-form'
import { Observer } from 'mobx-react-lite'
import { jobType, salary } from '../../services/constantVariable'
import { toJS } from 'mobx'

const AnnouncementMainInfoForm = (props) => {
  const { errors, register, control, data, jobPosition, companyName, authContext, disable } = props
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [authContext, data, jobPosition, companyName])
  const [jobTypes, setJobTypes] = useState(data?.announcement?.job_type || [])

  const handleChange = (event) => {
    setJobTypes([event.target.value])
  }

  return (
    <Observer>
      {() => (
        <>
          <div className="grid w-full grid-flow-row grid-cols-12 pt-6">
            <div
              className={`${
                authContext?.roleUser === 'admin' || authContext?.roleUser === 'viewer'
                  ? 'col-span-6 pr-3'
                  : 'col-span-12'
              }`}>
              <TextField
                label="หัวข้อ *"
                variant="outlined"
                className="w-full font-sarabun"
                name="announcement_title"
                inputRef={register}
                defaultValue={data?.announcement?.announcement_title || ''}
                error={!!errors.announcement_title}
                helperText={errors.announcement_title?.message}
                disabled={disable}
              />
            </div>
            {(authContext?.roleUser === 'admin' || authContext?.roleUser === 'viewer') && (
              <div className="col-span-6 pl-3">
                <AutoComplete
                  className="w-full"
                  label="บริษัท *"
                  inputRef={register}
                  keyName="company_id"
                  defaultValue={data?.announcement?.company_id || ''}
                  error={!!errors.company_id}
                  helperText={errors.company_id?.message}
                  options={toJS(data?.autoCompleteCompany)}
                  keySearch="company_name_th"
                  disable={disable}
                />
              </div>
            )}
          </div>
          <div className="flex flex-row justify-between pt-6">
            <div className="w-4/12 pr-3">
              <AutoComplete
                className="w-full"
                defaultValue={data?.announcement?.job_position_id || ''}
                label="ประเภทของงาน *"
                inputRef={register}
                keyName="job_position_id"
                keySearch="job_position"
                error={!!errors.job_position_id}
                helperText={errors.job_position_id?.message}
                options={toJS(data?.jobPositions)}
                disable={disable}
              />
            </div>
            <div className="w-4/12 pl-3 pr-6">
              <FormControl
                error={errors.job_type?.message}
                className="w-full font-prompt"
                variant="outlined"
                disabled={disable}>
                <InputLabel htmlFor="trinity-select" id="select-outlined-label">
                  ประเภทของประกาศ *
                </InputLabel>
                <Controller
                  control={control}
                  name="job_type"
                  defaultValue={jobTypes}
                  as={
                    <Select
                      multiple
                      onChange={handleChange}
                      name="job_type"
                      value={jobTypes}
                      input={<OutlinedInput label="ประเภทของประกาศ *" />}
                      id="select-outlined-label">
                      {_.map(jobType, (job) => (
                        <MenuItem key={job.title} value={job.title}>
                          {job.title}
                        </MenuItem>
                      ))}
                    </Select>
                  }
                />
                <FormHelperText>{errors.job_type?.message}</FormHelperText>
              </FormControl>
            </div>
            <div className="w-4/12">
              <FormControl
                error={errors.salary?.message}
                className="w-full font-prompt"
                variant="outlined"
                disabled={disable}>
                <InputLabel htmlFor="salary-select" id="select-outlined-label">
                  {'เงินเดือน (บาท) *'}
                </InputLabel>
                <Controller
                  control={control}
                  id="salary-select"
                  name="salary"
                  defaultValue={data?.announcement?.salary || ''}
                  as={
                    <Select
                      input={<OutlinedInput label="เงินเดือน (บาท) *" />}
                      id="select-outlined-label">
                      {_.map(salary, (salary) => (
                        <MenuItem key={salary.title} value={salary.title}>
                          {salary.title}
                        </MenuItem>
                      ))}
                    </Select>
                  }
                />
                <FormHelperText>{errors.salary?.message}</FormHelperText>
              </FormControl>
            </div>
          </div>
          <div className="flex flex-col pt-6 pb-3">
            <p className="mb-4 font-semibold font-prompt text-heading-6">รายละเอียดงาน</p>
            <FormControl className="w-full font-prompt">
              <TextField
                label="รายละเอียด *"
                className="border-opacity-50 place-content-start border-DEFAULT"
                variant="outlined"
                rows={5}
                multiline
                fullWidth
                defaultValue={data?.announcement?.job_description || ''}
                name="job_description"
                inputRef={register}
                error={!!errors.job_description}
                helperText={errors.job_description?.message}
                disabled={disable}
              />
            </FormControl>
          </div>
        </>
      )}
    </Observer>
  )
}

export default AnnouncementMainInfoForm
