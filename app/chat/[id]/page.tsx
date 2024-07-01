import { auth } from '@/auth';
import ChatPage from '@/components/ChatPage';
import { getMessage } from '@/lib/messagedata';
import { getUserProfile } from '@/lib/userData';
import { UserDocument } from '@/models/user.model';
import React from 'react'

// get the userId of participant user
const ChattingPage = async ({params}:{params:{id:string}}) => {
  let userProfile:any = await getUserProfile(params.id);
  const authUser = await auth();
  const _id:string = authUser?.user?._id
  console.log(_id)
  const message = authUser ? await getMessage(_id,params.id) : [];
  return (
    <div className='w-[72%]'>
        <ChatPage userProfile={userProfile} message={message} authUser={authUser}/>
    </div>
  )
}

export default ChattingPage;