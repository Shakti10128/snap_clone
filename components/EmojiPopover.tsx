import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EmojiArray } from "@/lib/emoji";
import { sendSnapMessage } from "@/lib/serveractions";
import { readFileAsDataURL } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { MdEmojiEmotions } from "react-icons/md";

export const EmojiPopover = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const sendEmojiHandler = async (srcUrl: string) => {
    try {
      setLoading(true);
      const blob = await fetch(srcUrl).then((res) => res.blob());
      const dataUrl = await readFileAsDataURL(blob);
      await sendSnapMessage(dataUrl, id, "image");
    } catch (error) {
      console.log("error while sending emoji");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size={"icon"} className="rounded-full">
          {loading ? (
            <Loader2 className=" h-4 w-4 animate-spin" />
          ) : (
            <MdEmojiEmotions size={"24px"} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-wrap items-center gap-4">
          {EmojiArray.map((emoji) => {
            return (
              <div
                className="cursor-pointer scale-90 hover:scale-110 transition-transform duration-100"
                key={emoji.src}
                onClick={() => sendEmojiHandler(emoji.src)}
              >
                <Image src={emoji.src} alt={emoji.alt} width={35} height={35} />
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPopover;
