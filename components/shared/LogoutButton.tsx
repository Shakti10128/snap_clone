import React from "react";
import { IoMdLogOut } from "react-icons/io";
import { Button } from "../ui/button";
import { LogoutHandler } from "@/lib/serveractions";

const LogoutButton = () => {
  return (
    <form action={LogoutHandler}>
      <Button size={"icon"} className="rounded-full">
          <IoMdLogOut size={"18px"} />
        </Button>
    </form>
  );
};

export default LogoutButton;
