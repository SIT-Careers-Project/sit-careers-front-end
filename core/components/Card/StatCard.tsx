import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

type StatCardProps = {
  title: string
  stat: number
  icon: React.ReactElement
  isLoading: boolean
}

export const StatCard = (props: StatCardProps) => {
  const { title, stat, icon, isLoading } = props
  return (
    <div style={{ height: '140px' }} className="grid justify-between w-full grid-cols-2 btn-grad">
      <div className="flex flex-col items-start justify-center pl-10 text-white">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <p className="text-heading-4 font-prompt">{new Number(stat).toLocaleString('th-TH')}</p>
        )}
        <p className="text-body-1 font-prompt">{title}</p>
      </div>
      <div className="flex flex-col items-center justify-center">{icon}</div>
    </div>
  )
}
