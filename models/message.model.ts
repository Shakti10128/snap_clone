import mongoose, { ObjectId, PopulatedDoc,Document, Model } from "mongoose";
import { UserDocument } from "./user.model";

export interface MessageInterface{
    senderId:ObjectId | PopulatedDoc<UserDocument>,
    receiverId: ObjectId | PopulatedDoc<UserDocument>,
    content:string,
    messageType: 'text' | 'image',
    opened:boolean
}


export interface MessageDocument extends MessageInterface,Document{
    createdAt:Date,
    updatedAt:Date
}

const messageSchema = new mongoose.Schema<MessageDocument>( {
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    content:{
        type:String,
        required:true,
    },
    messageType:{
        type:String,
        required:true,
        enum:['text','image'],
    },
    opened:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})

// optional chaining is just to check weither the message model already exist or not, else it will be give you error
export const Message:Model<MessageInterface> = mongoose?.models?.Message || mongoose.model("Message",messageSchema);