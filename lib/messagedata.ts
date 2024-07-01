import { Chats } from "@/models/chat.model";
import connectDatabase from "./db";


export const getMessage = async(loggedInUserId:string,otherUserId:string) =>{
    try {
        await connectDatabase();
        const chatMessage = await Chats.findOne({
            participants:{$all:[loggedInUserId,otherUserId]},
        }).populate({
            path:'message',
            populate:{
                path:'senderId',
                model:'User',
                select:"fullname",
            }
        })
        if(!chatMessage) return [];
        return JSON.parse(JSON.stringify(chatMessage.message));
    } catch (error) {
        console.log("Error while getting messages");
        throw error;
    }
}