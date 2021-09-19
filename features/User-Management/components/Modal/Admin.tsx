import React, { useEffect, useContext } from 'react'
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { Observer } from 'mobx-react-lite'
import { CoreModal } from 'core/components/Modal'
import { checkRoleRender } from 'core/services/utils'
import { userInfoPageContext } from '../../contexts/user_info_page_context'
import _ from 'lodash'
import { toJS } from 'mobx'

export const ModalAdmin = () => {
  const context = useContext(userInfoPageContext)
  const { handleSubmit, errors, control } = useForm()

  useEffect(() => {
    context.getAutoCompleteCompanies()
    context.getRoles()
    return () => {
      context.keyChange('roles', [])
    }
  }, [context])

  return (
    <Observer>
      {() => (
        <CoreModal
          isDisable={context.isLoading}
          buttonSubmit="เพิ่ม"
          title="เพิ่มผู้ใช้งาน"
          content={
            <div className="w-full">
              <FormControl error={errors.role_id} className="w-full" variant="outlined">
                <InputLabel htmlFor="role-name-select">เลือกบทบาทผู้ใช้งาน *</InputLabel>
                <Controller
                  control={control}
                  id="role-name-select"
                  name="role_id"
                  onChange={(e) => context.keyChange('roleSelected', e.target.value)}
                  rules={{ required: true }}
                  render={({ onChange, value, name }) => (
                    <Select
                      id="role-name-select"
                      value={value ? value : ''}
                      name={name}
                      onChange={(e) => {
                        onChange(e)
                        context.keyChange('roleSelected', e.target.value)
                      }}>
                      {_.map(toJS(context.roles), (item) => {
                        const roleName = checkRoleRender(item.role_name)
                        return (
                          <MenuItem key={item.role_id} value={item.role_id}>
                            {roleName} <span className="ml-1 capitalize">({item?.role_name})</span>
                          </MenuItem>
                        )
                      })}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.role_id && 'กรุณากรอกบทบาทผู้ใช้งาน'}</FormHelperText>
              </FormControl>
              <div className="mb-1">
                <FormControl error={errors.email} fullWidth variant="outlined">
                  <Controller
                    as={<TextField variant="outlined" />}
                    name="email"
                    control={control}
                    defaultValue=""
                    label="อีเมล"
                    fullWidth
                    InputLabelProps={{
                      className: 'required-label',
                      required: true
                    }}
                    rules={{ required: true }}
                    error={errors?.email}
                  />
                  <FormHelperText>{errors.email && 'กรุณากรอกอีเมลผู้ใช้'}</FormHelperText>
                </FormControl>
              </div>
              <FormControl error={errors.company_id} fullWidth variant="outlined">
                <InputLabel>บริษัท</InputLabel>
                <Controller
                  as={
                    <Select>
                      {_.map(context.autoCompleteCompany, (company) => (
                        <MenuItem key={company.company_id} value={company.company_id}>
                          {company.company_name_th} - {company.company_name_en}
                        </MenuItem>
                      ))}
                    </Select>
                  }
                  name="company_id"
                  control={control}
                  rules={{
                    required: context.roleSelected === context.roleViewer.role_id ? false : true
                  }}
                />
                <FormHelperText>{errors.company_id && 'กรุณากรอกชื่อบริษัท'}</FormHelperText>
              </FormControl>
            </div>
          }
          onSubmit={handleSubmit(context.createUserByAdmin)}
        />
      )}
    </Observer>
  )
}
