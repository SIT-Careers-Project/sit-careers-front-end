import React, { useContext, useEffect, useMemo, useState, useRef } from 'react'
import { Pie } from 'react-chartjs-2'
import { dashboardPageContext } from '../../context/dashboard_page_context'
import { Observer } from 'mobx-react-lite'

export const ChartInfoSection = () => {
  const context = useContext(dashboardPageContext)
  const [renderDelay, setRenderDelay] = useState(true)
  const chartRef = useRef(null)
  useEffect(() => {
    context.getStudentJobPositions(), context.getAnnouncementJobPositions()
    context.getCompanyTypes()
  }, [context])

  // const pieCompanyTypeData = useMemo(
  //   () => ({
  //     labels: context?.labelCompanyType,
  //     datasets: [
  //       {
  //         label: '# of Votes',
  //         data: context?.countCompanyType,
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 0.2)',
  //           'rgba(54, 162, 235, 0.2)',
  //           'rgba(255, 206, 86, 0.2)',
  //           'rgba(75, 192, 192, 0.2)',
  //           'rgba(153, 102, 255, 0.2)',
  //           'rgba(255, 159, 64, 0.2)'
  //         ],
  //         borderColor: [
  //           'rgba(255, 99, 132, 1)',
  //           'rgba(54, 162, 235, 1)',
  //           'rgba(255, 206, 86, 1)',
  //           'rgba(75, 192, 192, 1)',
  //           'rgba(153, 102, 255, 1)',
  //           'rgba(255, 159, 64, 1)'
  //         ],
  //         borderWidth: 1
  //       }
  //     ]
  //   }),
  //   []
  // )

  // const pieStudentJobPositions = useMemo(
  //   () => ({
  //     labels: context?.labelStudentJobPositions,
  //     datasets: [
  //       {
  //         label: '# of Votes',
  //         data: context?.countStudentJobPositions,
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 0.2)',
  //           'rgba(54, 162, 235, 0.2)',
  //           'rgba(255, 206, 86, 0.2)',
  //           'rgba(75, 192, 192, 0.2)',
  //           'rgba(153, 102, 255, 0.2)',
  //           'rgba(255, 159, 64, 0.2)'
  //         ],
  //         borderColor: [
  //           'rgba(255, 99, 132, 1)',
  //           'rgba(54, 162, 235, 1)',
  //           'rgba(255, 206, 86, 1)',
  //           'rgba(75, 192, 192, 1)',
  //           'rgba(153, 102, 255, 1)',
  //           'rgba(255, 159, 64, 1)'
  //         ],
  //         borderWidth: 1
  //       }
  //     ]
  //   }),
  //   []
  // )

  // const pieAnnouncementJobPositionsData = useMemo(
  //   () => ({
  //     labels: context?.labelAnnouncementJobPositions,
  //     datasets: [
  //       {
  //         label: '# of Votes',
  //         data: context?.countAnnouncementJobPositions,
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 0.2)',
  //           'rgba(54, 162, 235, 0.2)',
  //           'rgba(255, 206, 86, 0.2)',
  //           'rgba(75, 192, 192, 0.2)',
  //           'rgba(153, 102, 255, 0.2)',
  //           'rgba(255, 159, 64, 0.2)'
  //         ],
  //         borderColor: [
  //           'rgba(255, 99, 132, 1)',
  //           'rgba(54, 162, 235, 1)',
  //           'rgba(255, 206, 86, 1)',
  //           'rgba(75, 192, 192, 1)',
  //           'rgba(153, 102, 255, 1)',
  //           'rgba(255, 159, 64, 1)'
  //         ],
  //         borderWidth: 1
  //       }
  //     ]
  //   }),
  //   []
  // )

  const options = {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 20
      }
    }
  }

  return (
    <div>
      <div className="max-w-screen-lg mx-auto mb-40">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-4">
            <p className="text-center text-primary text-heading-5 pb-5 font-prompt">จำนวนบริษัท</p>
            {/* <Observer>
              {() => (
                <>
                  {context.chartCompanyType && (
                    <Pie
                      data={context?.chartCompanyType}
                      width={20}
                      height={20}
                      options={options}
                    />
                  )}
                </>
              )}
            </Observer> */}
          </div>
          <div className="col-span-4 ">
            <p className="text-center text-primary text-heading-5 pb-5 font-prompt">
              จำนวนนักศึกษาที่สมัครงาน
            </p>
            {/* <Pie data={pieCompanyTypeData} width={20} height={20} options={options} /> */}
          </div>
          <div className="col-span-4">
            <p className="text-center text-primary text-heading-5 pb-5 font-prompt">
              จำนวนประกาศรับสมัครงาน
            </p>
            {/* <Pie
                data={pieAnnouncementJobPositionsData}
                width={20}
                height={20}
                options={options}
              /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
