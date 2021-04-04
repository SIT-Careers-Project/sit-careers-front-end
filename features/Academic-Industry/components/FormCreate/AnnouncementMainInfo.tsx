import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'
import React from 'react'
import { AutoComplete } from '../../components/AutoComplete'
import { Controller } from 'react-hook-form'
import { Observer } from 'mobx-react-lite'
import { jobType, salary } from '../../services/constantVariable'

const AnnouncementMainInfoForm = (props) => {
  const { errors, register, control, data, jobPosition, companyName } = props

  return (
    <div>
      <div className="grid w-full grid-flow-row grid-cols-12 pt-6">
        <div className="col-span-6 pr-3">
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
              as={
                <Select id="select-outlined-label">
                  {jobType.map((job) => (
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
                  {salary.map((salary) => (
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
