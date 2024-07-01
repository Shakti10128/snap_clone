import React from "react";
import LogoutButton from "./shared/LogoutButton";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SearchBar from "./SearchBar";
import Friends from "./Friends";

const LeftsideBar = async() => {
  const userAuth = await auth();
  return (
    <div className="w-[50%] md:w-[25%] border-2 border-gray-300 rounded-lg">
      {/* profile */}
      <div className="flex p-4 items-center justify-between border-b border-gray-300 pb-3">
        <div className="flex items-center gap-2">
          {
            userAuth && (
              <>
                <Avatar>
                  <AvatarImage src={userAuth?.user?.image!} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="font-medium">{userAuth?.user?.name!}</h1>
              </>
            )
          }
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
      {/* chat section */}
      <div className="p-2">
        <SearchBar/>
        <Friends/>
      </div>
    </div>
  );
};

export default LeftsideBar;
