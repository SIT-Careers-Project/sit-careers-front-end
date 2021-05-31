import React, { useContext, useEffect } from 'react'
import { Card, TextField } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { LoginFormSchema } from '../services/validationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthContext } from '../../../core/contexts/auth_context'
import { Alert } from 'core/components/Alert'
import { Observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import Image from 'next/image'
import getConfig from 'next/config'
import { AlertContext } from 'core/contexts/alert_context'

const { publicRuntimeConfig } = getConfig()
export const Login = () => {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(LoginFormSchema)
  })
  const context = useContext(AuthContext)
  const alertContext = useContext(AlertContext)
  const router = useRouter()

  useEffect(() => {
    context.changeKey('alert', alertContext)
    context.fetchMe()
    if (context.isLoggedIn) {
      router.push('/')
    }
  }, [alertContext, context, router])

  const handlerLogin = () => {
    const { SIT_SSO_URL, SIT_SSO_STATE, SIT_SSO_REDIRECT, SIT_SSO_CLIENT_ID } = publicRuntimeConfig
    const url = `${SIT_SSO_URL}/login?response_type=code&client_id=${SIT_SSO_CLIENT_ID}&redirect_uri=${SIT_SSO_REDIRECT}&state=${SIT_SSO_STATE}`
    router.push(url)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Alert />
      <Card style={{ width: '410px', marginTop: '16px' }}>
        <div className="p-10">
          <p className="font-semibold text-center text-heading-6 font-prompt">Sign In</p>
          <Observer>
            {() => (
              <>
                <form onSubmit={handleSubmit(context.login)}>
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
                  <button type="submit" className="w-full p-2 mt-8 btn-grad focus:outline-none">
                    <p className="text-white text-heading-6">Submit</p>
                  </button>
                </form>
              </>
            )}
          </Observer>
          <div className="flex items-center justify-between w-full h-20">
            <hr className="w-full my-5 bg-secondary2" />
            <p className="mx-5">OR</p>
            <hr className="w-full my-5 bg-secondary2" />
          </div>
          <button
            onClick={handlerLogin}
            className="flex items-center justify-center w-full py-2 text-center cursor-pointer focus:outline-none bg-secondary1">
            <Image src="/image/sit-only-logo.png" width={24} height={24} />
            <p className="text-white text-heading-6">SIT Login</p>
          </button>
        </div>
      </Card>
    </div>
  )
}
