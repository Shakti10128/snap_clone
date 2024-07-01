import type { DefaultSession } from "@auth/core/types";
declare module "@auth/core/types"{
    interface session{
        user:{
            _id:string
        } & DefaultSession["user"]
    }
}