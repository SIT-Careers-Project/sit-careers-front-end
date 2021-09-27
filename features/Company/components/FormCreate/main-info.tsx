import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from '@material-ui/core'
import { companyType } from '../../services/constantVariable'
import React from 'react'
import { Controller } from 'react-hook-form'

const MainInfoForm = (props) => {
  const { register, errors, control, disable, viewer } = props

  return (
    <div>
      <div className="flex flex-row justify-between py-6">
        <div className="w-1/2 pr-3">
          <TextField
            label="ชื่อภาษาไทย *"
            name="company_name_th"
            variant="outlined"
            className="font-sarabun"
            inputRef={register}
            error={!!errors.company_name_th}
            helperText={errors.company_name_th?.message}
            fullWidth
            disabled={disable}
          />
        </div>
        <div className="w-1/2 pl-3">
          <TextField
            label="ชื่อภาษาอังกฤษ *"
            name="company_name_en"
            variant="outlined"
            className="font-sarabun"
            inputRef={register}
            error={!!errors.company_name_en}
            helperText={errors.company_name_en?.message}
            fullWidth
            disabled={disable}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-1/2 pr-3">
          <FormControl
            error={!!errors?.company_type}
            className="w-full font-prompt"
            variant="outlined"
            disabled={viewer}>
            <InputLabel htmlFor="trinity-select" id="select-outlined-label">
              ประเภทธุรกิจ
            </InputLabel>
            <Controller
              control={control}
              name="company_type"
              as={
                <Select input={<OutlinedInput label="ประเภทธุรกิจ" />} id="select-outlined-label">
                  {companyType.map((company) => (
                    <MenuItem key={company.title} value={company.title}>
                      {company.title}
                    </MenuItem>
                  ))}
                </Select>
              }
            />
            <FormHelperText>{errors.company_type?.message}</FormHelperText>
          </FormControl>
        </div>
        <div className="w-1/2 pl-3">
          <TextField
            label="เว็บไซต์"
            name="website"
            variant="outlined"
            className="font-sarabun"
            defaultValue=""
            inputRef={register}
            error={!!errors.website}
            helperText={errors.website?.message}
            fullWidth
            disabled={viewer}
          />
        </div>
      </div>
      <div className="flex flex-col justify-between py-6">
        <FormControl error={!!errors?.about_us} className="w-full font-prompt">
          <Controller
            control={control}
            name="about_us"
            as={
              <TextField
                label="แนะนำ"
                name="about_us"
                className="border-opacity-50 place-content-start border-DEFAULT"
                variant="outlined"
                defaultValue=""
                data-cy="about_us"
                error={!!errors?.about_us}
                helperText={errors.about_us?.message}
                rows={5}
                multiline
                fullWidth
                disabled={viewer}
              />
            }
          />
        </FormControl>
      </div>
    </div>
  )
}

export default MainInfoForm
