import mongoose,{Document, Model} from "mongoose";

// in starting we have only these info
export interface UserInterface{
     username:string,
     fullname:string,
     email:string,
     profilePhoto:string
}

// after user creation we will have the below info
export interface UserDocument extends UserInterface,Document{
    createdAt:Date,
    updatedAt:Date,
}

const userSchema = new mongoose.Schema<UserDocument>({
    username: {
        type:String,
        required:true,
        unique:true
    },
    fullname : {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    profilePhoto:{
        type:String,
        default:""
    }
},{timestamps:true});


// if user model is already present in models, no need to create another one,else create new one,
// but optional chaining is must to check weither the model exist or not
export const User:Model<UserDocument> = mongoose?.models?.User || mongoose.model("User",userSchema);