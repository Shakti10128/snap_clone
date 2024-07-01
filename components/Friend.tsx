import Link from "next/link";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { dateToYMD } from "@/lib/utils";
import { IoSend, IoSendOutline } from "react-icons/io5";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const Friend = ({ user }: { user: any }) => {
  const lastMessage = user.lastMessage;
  const lastMessageType = lastMessage?.messageType;
  const formattedDate = lastMessage ? dateToYMD(lastMessage?.createdAt) : dateToYMD(new Date());
  const amISender = lastMessage && lastMessage?.senderId?._id === user?.participants[0]?._id; 
  const isMessageOpened = lastMessage?.isOpened;

  let messageStatus:string = "";
  let icon:JSX.Element;
  if(amISender){
    messageStatus = isMessageOpened ? 'Opened' : 'Sent';
        icon = lastMessageType === 'text'
            ?
            (
                isMessageOpened ? <IoSend size={'16px'} className='text-[#00b4d8]' /> : <IoSendOutline size={'16px'} className='text-[#00b4d8]' />
            ) :
            (
                isMessageOpened ? <RiCheckboxBlankFill size={'16px'} className='text-red-500'/> : <MdCheckBoxOutlineBlank size={'16px'} className='text-red-500'/>
            )
  }
  else{
    if(!lastMessage){
      icon = <RiCheckboxBlankFill/>;
      messageStatus = 'New Snap';
    }
  }
  return (
    <Link href={`/chat/${user._id}`} className="flex items-center justify-between border-b-2 my-2 border-[#E3E6E8] p-3">
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage
            src={user?.participants[0]?.profilePhoto}
            alt="profilePhoto"
          />
        </Avatar>
        <div>
        <h1 className='font-medium'>{user.participants[0].fullname}</h1>
                    <p className={`${messageStatus === "New Snap" ? 'text-purple-600' : null} flex gap-1 text-xs font-bold text-gray-500`}>
                        <span className={`${messageStatus === "New Snap" ? 'hidden' : null}`}>{icon}</span>
                        {
                            messageStatus === "New Snap" ? <span className='font-bold'>{messageStatus} 🔥</span> : <span>{messageStatus} {formattedDate}</span>
                        }
                    </p>
        </div>
      </div>
    </Link>
  );
};

export default Friend;
