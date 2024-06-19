import React from 'react'
import UploadCareBtn from './uploadcare-btn'
import { useRouter } from 'next/navigation'
import UploadCareButton from './uploadcare-btn'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

type Props = {
    onDelete?: any,
    userImage?: string | null,
    onUpload?: any,
}

const ProfilePicture = ({onDelete, userImage, onUpload}: Props) => {
    const router = useRouter();

    const onRemoveProfileImage = async () => {
        const response = await onDelete();
        if(response){
            router.refresh();
        }
    }

  return (
    <div className='flex flex-col'>
        <p className='text-lg text-white'>Profile Picture</p>
        <div className='flex flex-col items-center justify-center h-[30vh]'>
            {
                userImage ? 
                <>
                <div className='relative h-full w-2/12'>
                    <Image
                    src={userImage}
                    alt="User Image"

                    />
                </div>
                <Button
                onClick={onRemoveProfileImage}
                className='bg-transparent text-white/70 hover:bg-transparent hover:text-white'
                >
                    <X/> Remove Logo
                </Button>
                </>
                : 
            <UploadCareButton/>

            }
        </div>
    </div>
  )
}

export default ProfilePicture