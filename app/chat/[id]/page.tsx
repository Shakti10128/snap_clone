import { auth } from '@/auth';
import ChatPage from '@/components/ChatPage';
import { getMessage } from '@/lib/messagedata';
import { getUserProfile } from '@/lib/userData';
import React from 'react'

// get the userId of participant user
const ChattingPage = async ({params}:{params:{id:string}}) => {
  let userProfile:any = await getUserProfile(params.id);
  const authUser = await auth();
  const message = authUser ? await getMessage(authUser?.user?._id, params.id) : [];
  return (
    <div className='w-[72%]'>
        <ChatPage userProfile={userProfile} message={message} authUser={authUser}/>
    </div>
  )
}

export default ChattingPage;