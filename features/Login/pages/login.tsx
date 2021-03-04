import React, { useContext, useEffect } from 'react'
import { Card, TextField } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { LoginFormSchema } from '../services/validationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthContext } from '../../../core/contexts/auth_context'
import { Observer } from 'mobx-react-lite'
import PrimaryButton from '../../../core/components/Button/Primary'
import { useRouter } from 'next/router'

export const Login = () => {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(LoginFormSchema)
  })
  const context = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    context.fetchMe()
    if (context.isLoggedIn) {
      router.push('/')
    }
  }, [context, router])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card style={{ width: '410px' }}>
        <div className="p-10">
          <p className="font-semibold text-center text-heading-6 font-prompt">Sign In</p>
          <Observer>
            {() => (
              <>
                <div className="mt-8">
                  <TextField
                    name="username"
                    label="Username"
                    className="font-sarabun"
                    type="text"
                    variant="standard"
                    fullWidth
                    inputRef={register}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                </div>
                <div className="mt-4">
                  <TextField
                    name="password"
                    label="Password"
                    className="font-sarabun"
                    type="password"
                    variant="standard"
                    inputRef={register}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    fullWidth
                  />
                </div>
                <PrimaryButton
                  onClick={handleSubmit(context.login)}
                  className="w-full p-2 mt-8 btn-grad focus:outline-none">
                  <p className="text-white text-heading-6">Submit</p>
                </PrimaryButton>
              </>
            )}
          </Observer>
        </div>
      </Card>
    </div>
  )
}
