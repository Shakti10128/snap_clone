import MyAi from "@/public/myai-asset.webp";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { auth } from "@/auth";

// icons
import { FaLaptop } from "react-icons/fa"
import { BsChatDots } from "react-icons/bs";


const Header = async() => {
  const authUser = await auth();
  return (
    <div className="flex items-center justify-center gap-20  mx-auto">
      {/* left */}
      <div>
        <h1 className="text-7xl font-medium">
          Snapchat is <br /> now on the <br /> wab!
        </h1>
        <h1 className="my-5 text-xl">
          Chat,Snap, and video call your friends from <br />
          wherever you are.
        </h1>

        {
          authUser ?
            <Link href={'/chat'}>
              <Button className="gap-2 rounded-full">
                <BsChatDots size={'18px'}/> Start chat
              </Button>
            </Link>
          :
            <Link href={'/login'}>
              <Button className="gap-2 rounded-full">
                <FaLaptop size={'18px'}/> Login to chat
              </Button>
            </Link>
        }

      </div>
      {/* right */}
      <div>
        <Image src={MyAi} alt="AI image" width={650} height={650} />
      </div>
    </div>
  );
};

export default Header;
