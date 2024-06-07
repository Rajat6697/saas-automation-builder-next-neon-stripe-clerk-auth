import SectionHeader from '@/components/section-header'
import React from 'react'

type Props = {}

const DashboardPage = (props: Props) => {
  return (
    <div className='flex flex-col gap-4 relative'>
      <SectionHeader
      title="Dashboard"
      />
    </div>
  )
}

export default DashboardPage