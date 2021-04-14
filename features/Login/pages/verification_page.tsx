import React, { useEffect, useContext } from 'react'
import { Card, TextField } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { VerificationFormSchema } from '../services/validationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { AuthContext } from 'core/contexts/auth_context'
import Link from 'next/link'

export const VerificationPage = () => {
  const context = useContext(AuthContext)
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(VerificationFormSchema)
  })
  const router = useRouter()
  const { urlVerify, signature } = router.query

  useEffect(() => {
    if (urlVerify && signature) {
      const url = `${urlVerify}&signature=${signature}`
      url.trim().replace('http://', 'https://')
      context.verifyEmail(url)
    }
  }, [context, signature, urlVerify])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Observer>
        {() => (
          <>
            <Card style={{ width: '410px' }}>
              {!context.verify && (
                <div className="p-10 h-360">
                  <p className="font-semibold text-center font-prompt text-heading-6">
                    ไม่สามารถตั้งค่ารหัสผ่านได้
                  </p>
                  <p className="mt-8 font-semibold text-red text-body-1 font-prompt">
                    เนื่องจากอายุลิงก์ในการยืนยันตัวตนหมดอายุ หรือมีการยืนยันตัวตนไปแล้ว
                    กรุณาติดต่อผู้ดูแลระบบเพื่อรับข้อความยืนยันตัวตนอีกครั้ง
                  </p>
                  <Link href="/login">
                    <button className="w-full p-2 mt-8 btn-grad focus:outline-none">
                      <p className="text-white text-heading-6">กลับไปยังหน้า Login</p>
                    </button>
                  </Link>
                </div>
              )}
              {context.verify && (
                <div className="p-10">
                  <p className="font-semibold text-center text-heading-6 font-prompt">
                    ตั้งค่ารหัสผ่านของคุณ
                  </p>
                  <form onSubmit={handleSubmit(context.setPassword)}>
                    <div className="mt-8">
                      <TextField
                        name="password"
                        label="รหัสผ่าน"
                        className="font-sarabun"
                        type="password"
                        variant="standard"
                        fullWidth
                        inputRef={register}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    </div>
                    <div className="mt-4">
                      <TextField
                        name="confirm_password"
                        label="ยืนยันรหัสผ่าน"
                        className="font-sarabun"
                        type="password"
                        variant="standard"
                        inputRef={register}
                        error={!!errors.confirm_password}
                        helperText={errors.confirm_password?.message}
                        fullWidth
                      />
                    </div>
                    <button type="submit" className="w-full p-2 mt-8 btn-grad focus:outline-none">
                      <p className="text-white text-heading-6">Submit</p>
                    </button>
                  </form>
                </div>
              )}
            </Card>
          </>
        )}
      </Observer>
    </div>
  )
}
