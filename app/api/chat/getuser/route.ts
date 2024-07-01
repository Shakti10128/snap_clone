import { auth } from "@/auth"
import connectDatabase from "@/lib/db";
import { User, UserDocument } from "@/models/user.model";
import { NextResponse } from "next/server";


export const GET = async()=>{
    try {
        // check user is logged in or not
        const authUser = await auth();
        if(!authUser) return;
        // connect the database
        await connectDatabase();
        const users:UserDocument[] = await User.find({email:{$ne:authUser?.user?.email}});
        return NextResponse.json(users);
    } catch (error) {
        console.log("Error while getting the user for sending the image snap");
        throw error;
    }
}