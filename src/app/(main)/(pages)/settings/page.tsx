import ProfileForm from '@/components/forms/profile-form'
import SectionHeader from '@/components/section-header'
import React from 'react'

type Props = {}

const SettingsPage = (props: Props) => {

    //WIP: Wire up profile picture
  return (
    <div className='flex flex-col gap-4 relative'>
      <SectionHeader
      title="Settings"
      />
      <div
      className='flex flex-col gap-4 p-6'
      >
        <div>
            <h2 className='font-bold text-3xl'>User Profile</h2>
            <p className='text-base text-white/50'>Update your profile here</p>
        </div>
      <ProfileForm/>
      </div>
    </div>
  )
}

export default SettingsPage