import React, { useContext, useEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import { dashboardPageContext } from '../../context/dashboard_page_context'
import { Observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

export const ChartInfoSection = () => {
  const context = useContext(dashboardPageContext)

  useEffect(() => {
    context.getStudentJobPositions()
    context.getAnnouncementJobPositions()
    context.getCompanyTypes()
  }, [context])

  const options = {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 20
      }
    }
  }

  return (
    <Observer>
      {() => (
        <>
          <div className="max-w-screen-lg mx-auto bg-grey-fbfcfd pb-40">
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-4">
                <p className="pb-5 text-center text-primary text-heading-5 font-prompt">
                  จำนวนบริษัท
                </p>
                <Pie
                  data={toJS(context?.chartCompanyType)}
                  width={20}
                  height={20}
                  options={options}
                />
              </div>
              <div className="col-span-4 ">
                <p className="pb-5 text-center text-primary text-heading-5 font-prompt">
                  จำนวนนักศึกษาที่สมัครงาน
                </p>
                <Pie
                  data={toJS(context?.chartStudentJobPositions)}
                  width={20}
                  height={20}
                  options={options}
                />
              </div>
              <div className="col-span-4">
                <p className="pb-5 text-center text-primary text-heading-5 font-prompt">
                  จำนวนประกาศรับสมัครงาน
                </p>
                <Pie
                  data={toJS(context?.chartAnnouncementJobPositions)}
                  width={20}
                  height={20}
                  options={options}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </Observer>
  )
}
