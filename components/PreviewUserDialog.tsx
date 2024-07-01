"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { UserDocument } from "@/models/user.model";
import { Loader2 } from "lucide-react";
import { sendSnapMessage } from "@/lib/serveractions";
import { useRouter } from "next/navigation";

const PreveiwUserDialog = ({
  selectedFile,
  close,
  onPreview,
}: {
  selectedFile: string;
  close: () => void;
  onPreview: any;
}) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sendMessageLoader, setSendmessageLoader] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDocument>();
  const router = useRouter();

  const selectedUserHandler = (user: UserDocument) => {
    setSelectedUser(user);
  };

  const sendSnapMessageHandler = async () => {
      try {
        setSendmessageLoader(true);
        await sendSnapMessage(selectedFile,selectedUser?._id as string,'image');
        router.push(`/chat/${selectedUser?._id}`);
    } catch (error) {
      console.log("Error while sending direct image snap");
      throw error;
    } finally {
      setSendmessageLoader(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/chat/getuser");
        const jsonData = await res.json();
        setUser(jsonData);
      } catch (error) {
        console.log("error while fetching user for sending the image snap");
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  return (
    <Dialog open={!!selectedFile}>
      <DialogContent
        onInteractOutside={close}
        className="sm:max-w-[425px] bg-white border max-w-xl flex flex-col"
      >
        <DialogHeader>
          <div className="flex items-center relative h-3/4 my-auto">
            <Input
              type="text"
              placeholder="Search user to send snap"
              id="name"
            />
          </div>
        </DialogHeader>
        <div className="grid gap-1 py-4">
          {user.map((user: UserDocument,index) => {
            return (
              <div
              key={index}
                className={`${
                  selectedUser?._id === user._id ? "bg-gray-200" : null
                } flex items-center gap-5 cursor-pointer p-2 rounded-md hover:bg-gray-200`}
                onClick={() => selectedUserHandler(user)}
              >
                <Avatar>
                  <AvatarImage src={user.profilePhoto} alt="profilePhoto" />
                </Avatar>
                <div>
                  <h1 className="font-medium">{user.fullname}</h1>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
              </div>
            );
          })}
          {
            // while users are loading will show loader to user
            loading && (
              <div className="mx-auto">
                <Loader2 className="mr-4 h-4 w-4 animate-spin" />
              </div>
            )
          }
        </div>
        <DialogFooter className="flex">
            <Button type="submit" onClick={close}>Cancel</Button>
          {sendMessageLoader ? (
            <Button type="submit">
                <Loader2 className="mr-4 h-4 w-4 animate-spin" />
              Sending...
            </Button>
          ) : (
            <Button type="submit" onClick={sendSnapMessageHandler}>
              Send
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreveiwUserDialog;
