import React from 'react'
import LeftsideBar from '@/components/LeftsideBar'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex h-screen'>
        <LeftsideBar/>
        {children}
    </div>
  )
}

export default layout