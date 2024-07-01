import mongoose, { Document,Model, Types } from "mongoose";

export interface ChatInterface{
    participants:Types.ObjectId[],
    message:Types.ObjectId[],
}


export interface ChatDocument extends ChatInterface,Document{
    createdAt:Date,
    updatedAt:Date
}

const chatSchema = new mongoose.Schema<ChatDocument>( {
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    message:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
        }
    ]
},{timestamps:true})


// optional chaining is just to check weither the chats model already exist or not, else it will be give you error
export const Chats:Model<ChatInterface> = mongoose?.models?.Chats || mongoose.model("Chats",chatSchema);