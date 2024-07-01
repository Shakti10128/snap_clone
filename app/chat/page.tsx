import ChatCamera from '@/components/ChatCamera'
import React from 'react'

const ChatPage = () => {
  return (
    <div className='flex flex-grow items-center'>
      <div className='bg-chatImage bg-cover bg-right-bottom  w-full h-[98%] mx-2 flex items-center justify-center px-6 rounded-lg'>
        <ChatCamera/>
      </div>
    </div>
  )
}

export default ChatPage