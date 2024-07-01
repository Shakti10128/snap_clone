import React from 'react'
import Friend from './Friend'

import { auth } from '@/auth'
import { leftSidebarUserData } from '@/lib/userData';

const Friends = async() => {
  const userAuth = await auth();
  const otherUser = await leftSidebarUserData(userAuth?.user?._id!);
  // console.log(otherUser);
  return (
    <div className='flex-1 overflow-y-auto'>
        {
          otherUser.map((user)=>{
            return <Friend key={user._id as string} user={user}/>
          })
        }
    </div>
  )
}

export default Friends