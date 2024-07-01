 import mongoose, {connection } from "mongoose";

// to check weither the database is connected or not
 let isDatabaseConnected : typeof connection | boolean = false;

 const connectDatabase = async()=>{
    if(isDatabaseConnected) {
        console.log("database already connected");
        return isDatabaseConnected;
    }
    else{
        try {
            const res = await mongoose.connect("mongodb+srv://aashutejaan10128:ryboOW0Jnhd6QqBA@cluster0.lxwldlc.mongodb.net/")
            isDatabaseConnected = res.connection
            return isDatabaseConnected;
        } catch (error) {
            console.log("database connection failed");
            throw error;
        }
    }
 }


 export default connectDatabase;