import React, { useContext, useEffect } from 'react'
import { TextField } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { Observer } from 'mobx-react-lite'
import { UserManagerFormSchema } from '../../services/validationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { CoreModal } from 'core/components/Modal'
import { userInfoPageContext } from '../../contexts/user_info_page_context'

export const ModalCompany = () => {
  const context = useContext(userInfoPageContext)

  useEffect(() => {
    context.getAutoCompleteCompanies()
    context.getRoles()
  }, [context])

  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(UserManagerFormSchema)
  })

  return (
    <Observer>
      {() => (
        <CoreModal
          buttonSubmit="เพิ่ม"
          title="เพิ่มผู้ประสานงาน"
          content={
            <div className="w-full">
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
            </div>
          }
          onSubmit={handleSubmit(context.createUserByCompany)}
        />
      )}
    </Observer>
  )
}
