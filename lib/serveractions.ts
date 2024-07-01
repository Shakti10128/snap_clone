'use server'

import { auth, signOut } from "@/auth";
import { Chats } from "@/models/chat.model";
import { Message } from "@/models/message.model";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from 'cloudinary';
import connectDatabase from "./db";
import { revalidatePath } from "next/cache";



cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET // Click 'View Credentials' below to copy your API secret
});

export const LogoutHandler = async()=>{
    try {
        await signOut();
    } catch (error) {
        console.log("logout failed")
        throw error;
    }
    redirect("/login");
}


export const sendSnapMessage = async(content:string,receiverId:string,messageType:'image'|'text')=>{
    try {
        await connectDatabase();
        const autUser = await auth();
        const senderId = autUser?.user?._id;
        let uploadResponse;
        if(messageType === 'image'){
            uploadResponse = await cloudinary.uploader.upload(content);
        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            content: uploadResponse?.secure_url || content,
            messageType,
            opened:false
        })
        let chat = await Chats.findOne({
            participants:{$all:[senderId,receiverId]}
        });
        if(!chat){
            chat = await Chats.create({
                participants:[senderId,receiverId],
                message:[newMessage._id]
            })
        }
        else{
            chat.message.push(newMessage._id);
            await chat.save();
        }
        revalidatePath(`/chat/${receiverId}`);
        return JSON.parse(JSON.stringify(newMessage));
    } catch (error) {
        console.log("Error while sending the snap message")
        throw error;
    }
}

export const clearChat = async(userId:string)=>{
    try {
        await connectDatabase();
        const authUser = await auth();
        if(!authUser?.user) return;

        const chats = await Chats.findOne({
            participants:{$all:[authUser?.user?._id,userId]}
        })
        if(!chats) return;
        const messageIdsInString = chats.message.map((id)=> id.toString());

        await Message.deleteMany({_id:{$in:messageIdsInString}});
        await Chats.deleteOne({_id:chats._id});
        redirect(`/chat`); 
    } catch (error) {
        console.log("error while clearing the chats");
        throw error;
    }
}