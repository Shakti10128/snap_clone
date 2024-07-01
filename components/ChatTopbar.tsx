"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { UserDocument } from "@/models/user.model";
import { Button } from "./ui/button";
import { clearChat } from "@/lib/serveractions";
import { useParams } from "next/navigation";
import { useFormStatus } from "react-dom";

const ChatTopbar = ({ userProfile }: { userProfile: UserDocument }) => {
  const { id } = useParams<{ id: string }>();
  const deleteChatHandler = clearChat.bind(null, id);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href={"/chat"}>
          <ArrowLeft />
        </Link>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={userProfile?.profilePhoto} alt="profilePhoto" />
          </Avatar>
          <h1 className="font-bold">{userProfile?.fullname}</h1>
        </div>
      </div>
      <form action={deleteChatHandler}>
        <SubmitButton />
      </form>
    </div>
  );
};

export default ChatTopbar;

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button variant={"destructive"}>
      {!pending ? (
        "Clear chat"
      ) : (
        <Button variant={"destructive"}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Clearing
        </Button>
      )}
    </Button>
  );
};
