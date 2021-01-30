import React, { useContext, useEffect } from 'react'
import { useObserver } from 'mobx-react-lite'
import { TextField, InputLabel, FormControl, MenuItem, Select } from '@material-ui/core'
import { Observer } from 'mobx-react-lite'
import { announcementApplicationFormContext } from '../context/announcement_application_page_context'
import { modalContext } from '../../../core/contexts/modal_context'
import { CoreModal } from '../../../core/components/Modal'
import PrimaryButton from '../../../core/components/Button/Primary'

const ApplicationForm = () => {
  const context = useContext(announcementApplicationFormContext)
  const coreModalContext = useContext(modalContext)

  useEffect(() => {
    context.keyChange('modal', coreModalContext)
  }, [context, coreModalContext])

  const Prefix = [{ title: 'นาย' }, { title: 'นางสาว' }, { title: 'นาง' }]

  return useObserver(() => (
    <div className="w-full h-full max-w-screen-lg pb-3">
      <div className="w-full max-w-screen-lg my-6 bg-white border-opacity-50 rounded font-prompt border-DEFAULT border-secondary2">
        <div className="w-full grid grid-cols-12 px-6 py-6">
          <div className="col-span-5">
            <div className="w-full md:w-10/12 ml-auto mr-auto px-4 py-6">
              <img alt="..." src="/image/application.png" />
            </div>
          </div>
          <div className="col-span-7 px-4">
            <div className="px-6 py-6">
              <span className="font-semibold font-prompt text-heading-6">สมัครงาน: </span>
              <span className="font-semibold font-prompt text-heading-6 text-primary">
                รับสมัครงานตำแหน่ง Software Engineer happy sexy cutey 1 อัตรา
              </span>
            </div>
            <div className="flex flex-row justify-between px-6 py-3">
              <div className="w-3/12">
                <FormControl className="w-full font-prompt bg-grey-100">
                  <InputLabel htmlFor="trinity-select">คำนำหน้า *</InputLabel>
                  <Select id="trinity-select" name="prefix">
                    {Prefix.map((prefix) => (
                      <MenuItem key={prefix.title} value={prefix.title}>
                        {prefix.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="w-4/12">
                <TextField
                  name="first_name"
                  label="ชื่อ *"
                  className="font-sarabun bg-grey-100"
                  fullWidth
                />
              </div>
              <div className="w-4/12">
                <TextField
                  label="นามสกุล *"
                  name="last_name"
                  className="font-sarabun bg-grey-100"
                  fullWidth
                />
              </div>
            </div>
            <div className="flex flex-row justify-between px-6 py-3">
              <div className="w-full">
                <TextField
                  label="เบอร์โทรศัพท์ *"
                  name="tel_no"
                  className="font-sarabun bg-grey-100"
                  defaultValue=""
                  fullWidth
                />
              </div>
            </div>
            <div className="flex flex-row justify-between px-6 py-3">
              <div className="w-full">
                <TextField
                  label="อีเมล *"
                  name="email"
                  className="font-sarabun bg-grey-100"
                  defaultValue=""
                  fullWidth
                />
              </div>
            </div>
            <div className="flex flex-row justify-between px-6 py-3">
              <div className="w-full">
                <TextField
                  label="Link ผลงาน *"
                  name="email"
                  className="font-sarabun bg-grey-100"
                  defaultValue=""
                  fullWidth
                />
              </div>
            </div>
            <div className="w-full px-6 py-3 col-span-7">
              <label htmlFor="upload-photo">
                <p className="mb-3 mr-40 font-prompt-medium text-body-1">อัพโหลดผลงาน</p>
                <input id="upload-photo" name="upload-photo" type="file" />
              </label>
            </div>
            <Observer>
              {() => (
                <>
                  <div
                    className="flex justify-end grid-cols-12 px-6 my-6 gap-x-8"
                    id="button-application">
                    <PrimaryButton
                      onClick={coreModalContext.openModal}
                      className="ml-10 shadow-md lg:w-2/6 btn-grad">
                      <p className="px-4 py-3 text-white font-prompt text-subtitle-1">
                        ยืนยันการสมัคร
                      </p>
                    </PrimaryButton>
                  </div>
                  <CoreModal
                    buttonSubmit="สมัคร"
                    title="ยืนยันการสมัคร"
                    content="คุณต้องการยืนยันการสมัครใช่หรือไม่"
                    onSubmit={() => console.log('Just test modal !')}
                  />
                </>
              )}
            </Observer>
          </div>
        </div>
      </div>
    </div>
  ))
}

export default ApplicationForm