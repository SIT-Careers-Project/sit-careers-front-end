/* eslint-disable @typescript-eslint/no-empty-function */
import { TextField } from '@material-ui/core'
import React, { useEffect } from 'react'
import { CoreModal } from '../../../../core/components/Modal'

const AnnouncementDateInfoForm = (props) => {
  const {
    errors,
    register,
    startDate,
    endDate,
    closeAnnouncement,
    changeStartDate,
    changeEndDate,
    showCloseButton,
    onSubmit,
    openModal,
    data,
    disable
  } = props

  useEffect(() => {}, [startDate, endDate])

  return (
    <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
      <div>
        <p className="font-semibold font-prompt text-heading-6">วันประกาศรับสมัคร</p>
      </div>
      <div className="flex flex-row pt-5 pb-3">
        <div className="pr-6">
          <TextField
            id="datetime-local"
            label="เปิดรับสมัคร *"
            variant="outlined"
            type="datetime-local"
            InputLabelProps={{
              shrink: true
            }}
            defaultValue={data?.announcement[0]?.start_date || ''}
            name="start_date"
            value={startDate}
            onChange={changeStartDate}
            inputRef={register}
            error={!!errors.start_date}
            helperText={errors.start_date?.message}
            disabled={disable}
          />
        </div>
        <div className="flex items-end justify-center pr-6">
          <p className="font-semibold text-heading-6 font-prompt">ถึง</p>
        </div>
        <div className="pr-6">
          <TextField
            id="datetime-local"
            label="ปิดรับสมัคร *"
            variant="outlined"
            type="datetime-local"
            InputLabelProps={{
              shrink: true
            }}
            defaultValue={data?.announcement[0]?.end_date || ''}
            name="end_date"
            value={endDate}
            onChange={changeEndDate}
            inputRef={register}
            error={!!errors.end_date}
            helperText={errors.end_date?.message}
            disabled={disable}
          />
        </div>
        {disable === false && (
          <>
            {showCloseButton && (
              <>
                <div className="flex justify-end w-2/4 grid-cols-12">
                  <button
                    className="text-white bg-red"
                    onClick={() => {
                      openModal()
                      closeAnnouncement()
                    }}>
                    <p className="px-5 text-white font-prompt text-subtitle-1">ปิดรับสมัคร</p>
                  </button>
                </div>
                {openModal && (
                  <CoreModal
                    buttonSubmit="ปิดรับสมัคร"
                    title="ปิดรับสมัคร"
                    content={
                      <>
                        <span className="mb-5 font-prompt text-subtitle-1">
                          คุณต้องการปิดรับสมัครหรือไม่
                        </span>
                      </>
                    }
                    onSubmit={onSubmit}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AnnouncementDateInfoForm
