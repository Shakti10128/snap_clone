'use client'

import Image from "next/image";
import React, { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";

const ChatBody = ({ message, authUser }: { message: any; authUser: any }) => {
  const [previewImage,setPreviewImage] = useState({
    isOpened:false,
    imgUrl:""
  })
  return (
    <div className="flex-1 my-3 border-2 border-gray-300 overflow-y-auto p-2 rounded-lg">
      {message.map((data: any, index: number) => {
        const ME = data.senderId._id === authUser.user?._id;
         const senderFullName = data?.senderId?.fullname.toUpperCase();
        const isMessageImage = data.messageType === "image";
        const isPreviousMessageFromSameUser =
          index > 0 && message[index - 1].senderId._id === data?.senderId._id;
        return (
          <div key={data.content} className="w-full">
            {!isPreviousMessageFromSameUser && (
              <p
                className={`font-bold mt-2 text-xs ${
                  ME ? "text-red-500" : "text-[#00b4d8]"
                }`}
              >
                {ME ? "ME" : senderFullName}
              </p>
            )}
            <div className={`border-l-2 ${ME ?"border-l-red-500" : "border-l-[#00b4d8]"}`}>
              <div className={`flex items-center w-1/2 p-2 rounded-sm`}>
                {
                  isMessageImage ? (
                    <Image
                    src={data.content}
                    alt="imgae"
                    width={80}
                    height={80}
                    className="h-auto w-auto object-cover cursor-pointer border p-2"
                    onClick={()=> setPreviewImage({isOpened:true,imgUrl:data.content})}
                    />
                  )
                  :
                   (
                    <p>{data.content}</p>
                   )
                }
              </div>
            </div>
          </div>
        );
      })}
      <Dialog open={previewImage.isOpened} onOpenChange={()=> setPreviewImage({isOpened:false,imgUrl:''})}>
        <DialogContent className="max-w-2xl h-96">
          {
            previewImage.imgUrl && (
              <Image
              src={previewImage.imgUrl}
              alt="previewImage"
              fill={true}
              className="border-2 border-white rounded-lg"
              />
            )
          }
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatBody;
