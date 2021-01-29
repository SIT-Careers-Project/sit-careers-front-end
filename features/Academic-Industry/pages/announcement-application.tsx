import React, { useContext, useEffect } from 'react'
import { useObserver } from 'mobx-react-lite'
import { TextField, InputLabel, FormControl, MenuItem, Select } from '@material-ui/core'
import { Observer } from 'mobx-react-lite'
import { announcementApplicationFormContext } from '../context/announcement_application_page_context'
import { modalContext } from '../../../core/contexts/modal_context'
import { CoreModal } from '../../../core/components/Modal'

const ApplicationForm = () => {
  const context = useContext(announcementApplicationFormContext)
  const coreModalContext = useContext(modalContext)

  useEffect(() => {
    context.keyChange('modal', coreModalContext)
  }, [context, coreModalContext])

  const Prefix = [{ title: 'นาย' }, { title: 'นางสาว' }, { title: 'นาง' }]

  return useObserver(() => (
    <div className="w-full h-full max-w-screen-lg">
      <div className="w-full max-w-screen-lg my-6 bg-white border-opacity-50 rounded font-prompt border-DEFAULT border-secondary2">
        <div className="px-6 py-6">
          <p className="font-semibold font-prompt text-heading-6">สมัครงาน:</p>
          <p className="font-semibold font-prompt text-heading-6 text-primary">
            รับสมัครงานตำแหน่ง Software Engineer happy sexy cutey 1 อัตรา
          </p>
        </div>
        <div className="flex flex-row justify-between px-6 py-3">
          <div className="w-4/12 pr-3">
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
          <div className="w-4/12 pr-3">
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
          <div className="w-1/2 pr-3">
            <TextField
              label="เบอร์โทรศัพท์ *"
              name="tel_no"
              className="font-sarabun bg-grey-100"
              defaultValue=""
              fullWidth
            />
          </div>
          <div className="w-1/2 pl-3">
            <TextField
              label="อีเมล *"
              name="email"
              className="font-sarabun bg-grey-100"
              defaultValue=""
              fullWidth
            />
          </div>
        </div>
        <div className="w-full px-6 py-3">
          <label htmlFor="upload-photo">
            <p className="mb-3 mr-40 font-prompt-medium text-body-1">รายละเอียดงาน</p>
            <input id="upload-photo" name="upload-photo" type="file" />
            <br />
            <br />
          </label>
        </div>
        <Observer>
          {() => (
            <>
              <div
                className="flex justify-end grid-cols-12 px-6 my-6 gap-x-8"
                id="button-application">
                <button
                  onClick={coreModalContext.openModal}
                  className="text-white bg-primary text-body-2">
                  <p className="px-5 py-2 font-prompt">ยืนยันการสมัคร</p>
                </button>
              </div>
              <CoreModal
                title="ยืนยันการสมัคร"
                content="คุณต้องการยืนยันการสมัครใช่หรือไม่"
                onSubmit={() => console.log('Just test modal !')}
              />
            </>
          )}
        </Observer>
      </div>
    </div>
  ))
}

export default ApplicationForm
