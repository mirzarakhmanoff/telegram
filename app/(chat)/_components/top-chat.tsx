import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCurrentContact } from "@/hooks/use-current";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import { Settings2 } from "lucide-react";
import Image from "next/image";
import React from "react";

function TopChat() {
  const { currentContact } = useCurrentContact();

  return (
    <div className="w-full flex items-start justify-between sticky top-0 z-50 h-[8vh] p-2  border-b bg-background">
      <div className="z-40 flex">
        <div className="relative w-10 h-10 rounded-full border overflow-hidden">
          <Avatar className="z-40">
            <AvatarImage
              src={currentContact?.avatar}
              alt={currentContact?.email}
              className="object-cover"
            />
            <AvatarFallback className="uppercase">
              {currentContact?.email[0]}
            </AvatarFallback>
          </Avatar>
          <div className="size-3 bg-green-500 absolute rounded-full bottom-0 right-0 !z-50"></div>
        </div>
        <div className="ml-2">
          <h2 className="font-medium text-sm">{currentContact?.email}</h2>
          {/* {IsTyping} */}
          {/* <div className="text-xs flex items-center gap-1 text-muted-foreground">
            <p className="text-secondary-foreground animate-pulse line-clamp-1">
              Hello
            </p>
            <div className="self-end mb-1">
              <div className="flex justify-center items-center gap-1">
                <div className="w-1 h-1 bg-secondary-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1 h-1 bg-secondary-foreground rounded-full animate-bounce [animation-delay:-0.10s]"></div>
                <div className="w-1 h-1 bg-secondary-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              </div>
            </div>
          </div> */}

          <p className="text-xs">
            {/* {Online} */}
            {/* <span> Online</span> */}
            <span>Last seen recently</span>
          </p>
        </div>
      </div>

      <Sheet>
        <SheetTrigger>
          {" "}
          <Button size={"icon"} variant={"secondary"} asChild>
            <Settings2 />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle />
          </SheetHeader>
          <div className=" rounded-full overflow-hidden w-[200px] h-[200px] mx-auto">
            {" "}
            <Avatar className="z-40">
              <AvatarImage
                src={currentContact?.avatar}
                alt={currentContact?.email}
                className="object-cover"
              />
              <AvatarFallback className="uppercase">
                {currentContact?.email[0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <Separator className="my-2" />
          <h1 className="text-center capitalize font-spaceGrotesk text-xl">
            {currentContact?.email}
          </h1>

          {currentContact?.firstName && (
            <div className="flex items-center gap-1 mt-4">
              <p className="font-spaceGrotesk">First Name: </p>
              <p className="font-spaceGrotesk text-muted-foreground">
                {currentContact?.firstName}
              </p>
            </div>
          )}
          {currentContact?.lastName && (
            <div className="flex items-center gap-1 mt-4">
              <p className="font-spaceGrotesk">Last Name: </p>
              <p className="font-spaceGrotesk text-muted-foreground">
                {currentContact?.lastName}
              </p>
            </div>
          )}
          {currentContact?.bio && (
            <div className="flex items-center gap-1 mt-4">
              <p className="font-spaceGrotesk">
                About:{" "}
                <span className="font-spaceGrotesk text-muted-foreground">
                  {currentContact?.bio}
                </span>
              </p>
            </div>
          )}
          <Separator className="my-2" />
          <h2 className="text-xl ">Image</h2>
          <div className="flex flex-col space-y-2">
            <div className="w-full relative  h-36">
              <Image
                src={"https://github.com/shadcn.png"}
                alt="alt"
                fill
                className="object-cover rounded-md"
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default TopChat;
