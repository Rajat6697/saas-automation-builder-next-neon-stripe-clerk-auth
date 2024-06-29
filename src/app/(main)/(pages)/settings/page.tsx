import ProfileForm from '@/components/forms/profile-form'
import SectionHeader from '@/components/section-header'
import React from 'react'
import ProfilePicture from './_components/profile-picture'
import { db } from '@/lib/db'

type Props = {}

const SettingsPage = (props: Props) => {

    const removeProfileImage  = async ()=> {
      'use server'
      const response = await db.user.update({
        where : {
          clerkId : authUser.id
        },
        data : {
          profileImage : ""
        }
      })
      return response;
    }

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
        {/* <ProfilePicture
        onDelete={removeProfileImage}
        userImage={user.profileImage || ''} 
        onUpload={uploadProfileImage}
        >

        </ProfilePicture> */}
      <ProfileForm/>
      </div>
    </div>
  )
}

export default SettingsPage