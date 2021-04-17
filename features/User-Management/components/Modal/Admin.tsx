import React, { useEffect, useContext } from 'react'
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { Observer } from 'mobx-react-lite'
import { UserFormSchema } from '../../services/validationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { CoreModal } from 'core/components/Modal'
import { checkRoleRender } from 'core/services/utils'
import { AutoComplete } from 'core/components/AutoComplete'
import { userInfoPageContext } from '../../contexts/user_info_page_context'
import _ from 'lodash'
import { toJS } from 'mobx'

export const ModalAdmin = () => {
  const context = useContext(userInfoPageContext)

  useEffect(() => {
    context.getAutoCompleteCompanies()
    context.getRoles()
  }, [context])

  const { handleSubmit, register, errors, control } = useForm({
    resolver: yupResolver(UserFormSchema)
  })

  return (
    <Observer>
      {() => (
        <CoreModal
          buttonSubmit="เพิ่ม"
          title="เพิ่มผู้ประสานงาน"
          content={
            <div className="w-full">
              <FormControl
                error={!!errors?.start_business_day}
                className="w-full"
                variant="outlined">
                <InputLabel htmlFor="role-name-select">เลือกบทบาทผู้ใช้งาน *</InputLabel>
                <Controller
                  control={control}
                  id="role-name-select"
                  name="role_id"
                  as={
                    <Select>
                      {_.map(toJS(context.roles), (item, i) => {
                        const roleName = checkRoleRender(item.role_name)
                        return (
                          <MenuItem key={i} value={item.role_id}>
                            {roleName} <span className="ml-1 capitalize">({item?.role_name})</span>
                          </MenuItem>
                        )
                      })}
                    </Select>
                  }
                />
              </FormControl>
              <div className="my-2 font-sarabun">
                <TextField
                  name="email"
                  label="อีเมล *"
                  variant="outlined"
                  inputRef={register}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                />
              </div>
              <AutoComplete
                className="w-full"
                label="บริษัท"
                inputRef={register}
                keyName="company_id"
                error={!!errors.company_id}
                helperText={errors.company_id?.message}
                options={context.autoCompleteCompany}
                keySearch="company_name_th"
              />
            </div>
          }
          onSubmit={handleSubmit(context.createUserByAdmin)}
        />
      )}
    </Observer>
  )
}
