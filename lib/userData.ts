import { Message } from "@/models/message.model";
import { User, UserDocument } from "@/models/user.model";
import connectDatabase from "./db";


export const leftSidebarUserData = async(LoggedInUserId:string)=>{
    try {
        // fetch all user,excepting the logged in user
        const otherUsers = await User.find({_id:{$ne:LoggedInUserId}});

        const userInfo = await Promise.all(
            otherUsers.map(async(user)=>{
                const lastMessage = await Message.findOne({
                    $or:[
                        {senderId:user?._id,receiverId:LoggedInUserId},
                        {senderId:LoggedInUserId,receiverId:user?._id}
                    ]
                }).sort({createdAt:-1})
                .populate("senderId","username profilePhoto _id")
                .populate("receiverId","username profilePhoto _id")
                .exec();

                return {
                    _id:user?._id,
                    participants:[user],
                    lastMessage: lastMessage ? {
                        ...lastMessage.toJSON(),
                        senderId:lastMessage.senderId,
                        receiverId:lastMessage.receiverId
                    } : null,
                }
            })
        )
        return userInfo;
    } catch (error) {
        console.log("Unable to fetch users data");
        throw error;
    }
}

export const getUserProfile = async(userId:string)=>{
    try {
        await connectDatabase();
        const user : UserDocument | null = await User.findOne({_id: userId});
        if(user) return JSON.parse(JSON.stringify(user));
        else return null; 
    } catch (error) {
        console.log("Error while fething chat user profile");
        throw error;
    }
}