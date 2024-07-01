import SnapchatLogo from "@/public/snapchat_logo.webp";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";


// react icons
import { IoMdApps } from "react-icons/io";
import LogoutButton from "./shared/LogoutButton";
import { auth } from "@/auth";

const Navbar = async() => {
  const authUser = await auth();
  return (
    <div className="flex items-center justify-between px-10 py-4 w-screen">
      <div className="flex items-center gap-2">
        <Image src={SnapchatLogo} alt="snapchat_logo" width={50} height={50} />
        <Input type="text" placeholder="Search..." className="rounded-full" />
      </div>
      <div>
        <Button variant={"ghost"}>Stories</Button>
        <Button variant={"ghost"}>Spotlight</Button>
        <Button variant={"ghost"}>Chat</Button>
        <Button variant={"ghost"}>Lenses</Button>
      </div>
      <div className="flex items-center gap-5">
        <Button size={"icon"} variant={"secondary"} className="rounded-full bg-white text-black">
            <IoMdApps size={"25px"}/>
        </Button>
        <Button className="rounded-full">Snapchat Ads</Button>
        <Button className="rounded-full">Download</Button>
        {
          authUser ? (<LogoutButton/>) :
          (<Link href={'/login'}><Button className="rounded-full">Login</Button></Link>)
        }
      </div>
    </div>
  );
};

export default Navbar;
