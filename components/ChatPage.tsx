import React from 'react'
import ChatTopbar from './ChatTopbar'
import ChatBody from './ChatBody'
import ChatInput from './ChatInput'

const ChatPage = ({userProfile,message,authUser}:{userProfile:any,message:any,authUser:any}) => {
  return (
    <div className='m-2 flex flex-col h-[96%]'>
      <ChatTopbar userProfile={userProfile}/>
      <ChatBody message={message} authUser={authUser}/>
      <ChatInput/>
    </div>
  )
}

export default ChatPage