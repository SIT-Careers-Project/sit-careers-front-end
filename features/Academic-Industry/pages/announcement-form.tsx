import React, { useContext } from 'react'
import { useObserver } from 'mobx-react-lite'
import { Observer } from 'mobx-react-lite'
import {
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Chip,
  Dialog,
  DialogActions
} from '@material-ui/core'
import { AnnouncementBanner } from '../../../core/components/AnnouncementImage'
import { announcementFormPageContext } from '../context/announcement_form_page_context'
import { announcementType, jobPosition, days, salary } from '../services/constantVariable'

const AnnouncementForm = () => {
  const context = useContext(announcementFormPageContext)

  return useObserver(() => (
    <div className="w-full h-full max-w-screen-lg">
      <div className="w-full max-w-screen-lg my-6 bg-white border-opacity-50 rounded font-prompt border-DEFAULT border-secondary2">
        <div className="px-6 pt-6">
          <p className="font-semibold font-prompt text-heading-6">วันประกาศรับสมัคร</p>
        </div>
        <div className="flex flex-row px-6 py-6">
          <div className="pr-6">
            <TextField
              id="datetime-local"
              label="เปิดรับสมัคร *"
              type="datetime-local"
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div className="flex items-end justify-center pr-6">
            <p className="font-semibold text-heading-6 font-prompt">ถึง</p>
          </div>
          <div className="pr-6">
            <TextField
              id="datetime-local"
              label="ปิดรับสมัคร *"
              type="datetime-local"
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div className="flex justify-end w-2/4 grid-cols-12">
            <button className="text-white bg-red">
              <p className="px-5 py-3 text-white font-prompt text-subtitle-1">ปิดรับสมัคร</p>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-screen-lg my-6 bg-white border-opacity-50 rounded font-prompt border-DEFAULT border-secondary2">
        <div className="px-6 pt-6">
          <p className="font-semibold font-prompt text-heading-6">ข้อมูลประกาศรับสมัคร</p>
          <button className="w-full h-40 border-none focus:outline-none">
            <InputLabel htmlFor="company_logo_image_label">
              <AnnouncementBanner className="mt-5 cursor-pointer bg-grey-100" />
            </InputLabel>
            <input
              id="company_logo_image_label"
              type="file"
              name="company_logo_image"
              className="hidden"
            />
          </button>
        </div>
        <div className="w-full px-6 pt-6">
          <TextField
            label="หัวข้อ *"
            name="address_one"
            className="font-sarabun bg-grey-100"
            fullWidth
          />
        </div>
        <div className="flex flex-row justify-between pt-6">
          <div className="w-4/12 pl-6 pr-3">
            <FormControl className="w-full font-prompt bg-grey-100">
              <InputLabel htmlFor="trinity-select">ประเภทของงาน *</InputLabel>
              <Select id="trinity-select" name="company_type">
                {jobPosition.map((job) => (
                  <MenuItem key={job.title} value={job.title}>
                    {job.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-4/12 pl-3 pr-6">
            <FormControl className="w-full font-prompt bg-grey-100">
              <InputLabel htmlFor="trinity-select">ประเภทของประกาศ *</InputLabel>
              <Select
                id="trinity-select"
                name="company_type"
                value={context.announcementType}
                multiple
                onChange={(event) => {
                  context.setAnnouncementType(event.target.value)
                }}
                renderValue={() => (
                  <div>
                    {context.announcementType.map((announcement) => (
                      <Chip key={announcement} label={announcement} />
                    ))}
                  </div>
                )}>
                {announcementType.map((announcement) => (
                  <MenuItem key={announcement.title} value={announcement.title}>
                    {announcement.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-4/12 pr-6">
            <FormControl className="w-full font-prompt bg-grey-100">
              <InputLabel htmlFor="trinity-select">{'เงินเดือน (บาท) *'}</InputLabel>
              <Select id="trinity-select" name="company_type">
                {salary.map((salary) => (
                  <MenuItem key={salary.title} value={salary.title}>
                    {salary.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="flex flex-col px-6 pt-6 pb-6">
          <p className="mb-4 font-semibold font-prompt text-heading-6">รายละเอียดบริษัท</p>
          <FormControl className="w-full font-prompt bg-grey-100">
            <TextField
              label="รายละเอียด *"
              name="description"
              className="border-opacity-50 place-content-start bg-grey-100 border-DEFAULT"
              variant="outlined"
              defaultValue=""
              rows={5}
              multiline
              fullWidth
            />
          </FormControl>
        </div>
        <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
        <div className="flex flex-col px-6 pb-6">
          <p className="mb-4 font-semibold font-prompt text-heading-6">คุณสมบัติ</p>
          <FormControl className="w-full font-prompt bg-grey-100">
            <TextField
              label="คุณสมบัติ *"
              name="description"
              className="border-opacity-50 place-content-start bg-grey-100 border-DEFAULT"
              variant="outlined"
              defaultValue=""
              rows={5}
              multiline
              fullWidth
            />
          </FormControl>
        </div>
        <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
        <div className="flex flex-col px-6 pb-6">
          <p className="mb-4 font-semibold font-prompt text-heading-6">สวัสดิการ</p>
          <FormControl className="w-full font-prompt bg-grey-100">
            <TextField
              label="สวัสดิการ *"
              name="description"
              className="border-opacity-50 place-content-start bg-grey-100 border-DEFAULT"
              variant="outlined"
              defaultValue=""
              rows={5}
              multiline
              fullWidth
            />
          </FormControl>
        </div>
        <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
        <p className="mb-3 ml-6 font-semibold font-prompt text-heading-6">สถานที่ปฏิบัติการ</p>
        <div className="w-full px-6">
          <TextField
            label="ที่อยู่ 1 *"
            name="address_one"
            className="font-sarabun bg-grey-100"
            fullWidth
          />
        </div>
        <div className="w-full px-6 my-6">
          <TextField
            label="ที่อยู่ 2"
            name="address_two"
            className="font-sarabun bg-grey-100"
            fullWidth
          />
        </div>
        <div className="flex flex-row justify-between">
          <div className="w-4/12 pl-6 pr-3">
            <TextField label="ซอย" name="lane" className="font-sarabun bg-grey-100" fullWidth />
          </div>
          <div className="w-4/12 pl-3 pr-3">
            <TextField name="road" label="ถนน" className="font-sarabun bg-grey-100" fullWidth />
          </div>
          <div className="w-4/12 pl-3 pr-6">
            <TextField
              name="sub_district"
              label="ตำบล/เขต *"
              className="font-sarabun bg-grey-100"
              fullWidth
            />
          </div>
        </div>
        <div className="flex flex-row justify-between pb-6 mt-6">
          <div className="w-4/12 pl-6 pr-3">
            <TextField
              name="district"
              label="อำเภอ *"
              className="font-sarabun bg-grey-100"
              fullWidth
            />
          </div>
          <div className="w-4/12 px-3">
            <TextField
              name="province"
              label="จังหวัด *"
              className="font-sarabun bg-grey-100"
              fullWidth
            />
          </div>
          <div className="w-4/12 pl-3 pr-6">
            <TextField
              name="postal_code"
              label="รหัสไปรษณีย์ *"
              className="font-sarabun bg-grey-100"
              fullWidth
            />
          </div>
        </div>
        <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
        <p className="mb-3 ml-6 font-semibold font-prompt text-heading-6">วันที่ทำการ</p>
        <div className="flex flex-row pb-6">
          <div className="w-4/12 pl-6 pr-3">
            <FormControl className="w-full font-prompt bg-grey-100">
              <InputLabel htmlFor="start-business-day-select">วันเปิดทำการ *</InputLabel>
              <Select id="start-business-day-select">
                {days.map((data) => (
                  <MenuItem key={data.day} value={data.day}>
                    {data.day}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-4/12 pl-3 pr-3">
            <TextField
              name="start_business_time"
              label="เวลาเปิดทำการ *"
              className="font-sarabun bg-grey-100"
              type="time"
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
            />
          </div>
          <div className="flex items-end justify-center col-span-1">
            <p className="font-semibold text-heading-6 font-prompt">ถึง</p>
          </div>
          <div className="w-4/12 pl-3 pr-3">
            <FormControl className="w-full font-prompt bg-grey-100">
              <InputLabel htmlFor="end-business-day-select">วันเปิดทำการ *</InputLabel>
              <Select id="end-business-day-select">
                {days.map((data) => (
                  <MenuItem key={data.day} value={data.day}>
                    {data.day}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-4/12 pl-3 pr-6">
            <TextField
              name="end_business_time"
              label="เวลาปิดทำการ *"
              className="font-sarabun bg-grey-100"
              type="time"
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
            />
          </div>
        </div>
        <Observer>
          {() => (
            <>
              <div className="flex justify-end grid-cols-12 px-6 my-6">
                <button onClick={context.handleModal} className="text-white bg-primary">
                  <p className="px-5 py-3 text-white font-prompt text-subtitle-1">
                    บันทึกและประกาศ
                  </p>
                </button>
              </div>
              <Dialog open={context.showModal} onClose={context.handleCloseModal}>
                <div className="p-4 text-left">
                  <p className="mb-3 mr-40 font-prompt-medium text-heading-6">บันทึกและประกาศ</p>
                  <span className="mb-5 font-prompt text-subtitle-1">
                    คุณต้องการบันทึกและประกาศรับสมัครงานใช่หรือไม่
                  </span>
                  <DialogActions className="mt-4">
                    <button onClick={context.handleCloseModal} className="text-secondary2">
                      <p className="px-5 py-2 font-prompt">ยกเลิก</p>
                    </button>
                    <button className="text-white bg-primary">
                      <p className="px-5 py-2 font-prompt">บันทึก</p>
                    </button>
                  </DialogActions>
                </div>
              </Dialog>
            </>
          )}
        </Observer>
      </div>
    </div>
  ))
}

export default AnnouncementForm
