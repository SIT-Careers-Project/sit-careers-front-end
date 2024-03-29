import React, { useEffect, useContext } from 'react'
import { Card, TextField } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { VerificationFormSchema } from '../services/validationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { AuthContext } from 'core/contexts/auth_context'
import { AlertContext } from 'core/contexts/alert_context'
import Link from 'next/link'
import { Alert } from 'core/components/Alert'

export const VerificationPage = () => {
  const context = useContext(AuthContext)
  const alertContext = useContext(AlertContext)
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(VerificationFormSchema)
  })
  const router = useRouter()
  const { urlVerify, signature } = router.query

  useEffect(() => {
    context.changeKey('alert', alertContext)
    if (urlVerify && signature) {
      const url = `${urlVerify}&signature=${signature}`
      const httpsUrl = url.trim().replace('http://', 'https://')
      context.verifyEmail(httpsUrl)
    }
  }, [alertContext, context, signature, urlVerify])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Alert />
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
                    เนื่องจากอายุลิงก์ในการยืนยันตัวตนหมดอายุหรือมีการยืนยันตัวตนไปแล้ว
                    กรุณาติดต่อผู้ดูแลระบบ เพื่อรับข้อความยืนยันตัวตนอีกครั้ง
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
                    <div className="pt-5">
                      <p className="font-semibold text-body-2 text-primary font-prompt">
                        รหัสผ่านต้องมี:
                      </p>
                      <p className="text-body-2 text-secondary2 font-prompt">
                        ○ ตัวอักษรอย่างน้อย 8 ตัว
                      </p>
                      <p className="text-body-2 text-secondary2 font-prompt">
                        ○ ภาษาอังกฤษตัวพิมพ์ใหญ่ เช่น A, B, C
                      </p>
                      <p className="text-body-2 text-secondary2 font-prompt">
                        ○ ภาษาอังกฤษตัวพิมพ์เล็ก เช่น a, b, c
                      </p>
                      <p className="text-body-2 text-secondary2 font-prompt">
                        ○ ตัวเลข เช่น 1, 2, 3
                      </p>
                      <p className="text-body-2 text-secondary2 font-prompt">
                        ○ อักขระพิเศษ {`(~!@#$%^&*( )_+-={ }|[ ]:";'< >?,./)`}
                      </p>
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
