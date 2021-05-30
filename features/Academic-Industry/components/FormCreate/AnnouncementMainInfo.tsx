import {
  FormControl,
  FormHelperText,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { AutoComplete } from 'core/components/AutoComplete'
import { Controller } from 'react-hook-form'
import { Observer } from 'mobx-react-lite'
import { jobType, salary } from '../../services/constantVariable'

const AnnouncementMainInfoForm = (props) => {
  const { errors, register, control, data, jobPosition, companyName, authContext } = props
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [errors, register, control, data, jobPosition, companyName, authContext])
  const [jobTypes, setJobTypes] = useState(data?.announcement?.job_type || [])

  const handleChange = (event) => {
    setJobTypes([event.target.value])
  }

  return (
    <div>
      <div className="grid w-full grid-flow-row grid-cols-12 pt-6">
        <div className={`${authContext?.roleUser === 'admin' ? 'col-span-6 pr-3' : 'col-span-12'}`}>
          <TextField
            label="หัวข้อ *"
            variant="outlined"
            className="w-full font-sarabun"
            name="announcement_title"
            inputRef={register}
            error={!!errors.announcement_title}
            helperText={errors.announcement_title?.message}
          />
        </div>
        {authContext?.roleUser === 'admin' && (
          <div className="col-span-6 pl-3">
            <Observer>
              {() => (
                <AutoComplete
                  className="w-full"
                  label="บริษัท *"
                  inputRef={register}
                  keyName="company_id"
                  defaultValue={companyName}
                  error={!!errors.company_id}
                  helperText={errors.company_id?.message}
                  options={data.autoCompleteCompany}
                  keySearch="company_name_th"
                />
              )}
            </Observer>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between pt-6">
        <div className="w-4/12 pr-3">
          <Observer>
            {() => (
              <AutoComplete
                className="w-full"
                defaultValue={jobPosition}
                label="ประเภทของงาน *"
                inputRef={register}
                keyName="job_position_id"
                keySearch="job_position"
                error={!!errors.job_position_id}
                helperText={errors.job_position_id?.message}
                options={data.jobPositions}
              />
            )}
          </Observer>
        </div>
        <div className="w-4/12 pl-3 pr-6">
          <FormControl
            error={errors.job_type?.message}
            className="w-full font-prompt"
            variant="outlined">
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
                  value={jobTypes}
                  input={<InputBase />}
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
            variant="outlined">
            <InputLabel htmlFor="salary-select" id="select-outlined-label">
              {'เงินเดือน (บาท) *'}
            </InputLabel>
            <Controller
              control={control}
              id="salary-select"
              name="salary"
              as={
                <Select id="select-outlined-label">
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
            defaultValue=""
            rows={5}
            multiline
            fullWidth
            name="job_description"
            inputRef={register}
            error={!!errors.job_description}
            helperText={errors.job_description?.message}
          />
        </FormControl>
      </div>
    </div>
  )
}

export default AnnouncementMainInfoForm
