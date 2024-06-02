import Image from 'next/image'
import React from 'react'
import fuzzieLogo from '../../../public/fuzzieLogo.png'

type Props = {}

const Navbar = async (props: Props) => {
  return (
    <header className='fixed right-0 left-0 top-0 py-4 px-4 bg-black/40 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between'>
        <aside className='flex items-center gap-[2px]'>
        <p className='text-3xl font-bold'>Fu</p>
        <Image
        src={fuzzieLogo}
        width={15}
        height={15}
        alt="Fuzzie Logo"
        className='shadow-sm'
        />
        <p className='text-3xl font-bold'>zzie</p>
        </aside>
        <nav className='absolute left-[50%] right-[50%] transform translate-x-[50%] translate-y-[50%] hidden md:block'>
        Text
        </nav>
    </header>
  )
}

export default Navbar