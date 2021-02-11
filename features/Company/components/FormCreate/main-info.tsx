import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'
import { companyType } from '../../services/constantVariable'
import React from 'react'
import { Controller } from 'react-hook-form'

const MainInfoForm = (props) => {
  const { register, errors, control } = props
  
  return (
    <div>
      <div className="flex flex-row justify-between px-6 py-6">
        <div className="w-1/2 pr-3">
          <TextField
            label="ชื่อภาษาไทย *"
            name="company_name_th"
            className="font-sarabun bg-grey-100"
            defaultValue=""
            inputRef={register}
            error={!!errors.company_name_th}
            helperText={errors.company_name_th?.message}
            fullWidth
          />
        </div>
        <div className="w-1/2 pl-3">
          <TextField
            label="ชื่อภาษาอังกฤษ *"
            name="company_name_en"
            className="font-sarabun bg-grey-100"
            defaultValue=""
            inputRef={register}
            error={!!errors.company_name_en}
            helperText={errors.company_name_en?.message}
            fullWidth
          />
        </div>
      </div>
      <div className="flex flex-row justify-between px-6">
        <div className="w-1/2 pr-3">
          <FormControl error={!!errors?.company_type} className="w-full font-prompt bg-grey-100">
            <InputLabel htmlFor="trinity-select">ประเภทธุรกิจ *</InputLabel>
            <Controller
              control={control}
              name="company_type"
              as={
                <Select id="trinity-select">
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
            className="font-sarabun bg-grey-100"
            defaultValue=""
            inputRef={register}
            error={!!errors.website}
            helperText={errors.website?.message}
            fullWidth
          />
        </div>
      </div>
      <div className="flex flex-col justify-between p-6">
        <FormControl error={!!errors?.about_us} className="w-full font-prompt bg-grey-100">
          <Controller
            control={control}
            name="about_us"
            as={
              <TextField
                label="แนะนำ *"
                name="about_us"
                className="border-opacity-50 place-content-start bg-grey-100 border-DEFAULT"
                variant="outlined"
                defaultValue=""
                error={!!errors?.about_us}
                helperText={errors.about_us?.message}
                rows={5}
                multiline
                fullWidth
              />
            }
          />
        </FormControl>
      </div>
    </div>
  )
}

export default MainInfoForm
