import DangerZoneForm from "@/components/forms/dangerZoneForm";
import EmailForm from "@/components/forms/emailForm";
import InformationForm from "@/components/forms/informationForm";
import NotificationForm from "@/components/forms/notificationForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Avatar } from "@radix-ui/react-avatar";
import {
  LogIn,
  Menu,
  Moon,
  Settings2,
  Sun,
  Upload,
  UserPlus,
  VolumeOff,
} from "lucide-react";
import { useTheme } from "next-themes";
import React, { useState } from "react";

function Settings() {
  const { resolvedTheme, setTheme } = useTheme();
  const [sheet, setSheet] = useState(false);
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button variant={"secondary"}>
            <Menu />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-80">
          <h2 className="font-spaceGrotesk pt-2 pl-2 text-muted-foreground ">
            Settings:{" "}
            <span className="text-white">mirzarakhmanoff@gmail.com</span>
          </h2>
          <Separator className="my-2" />
          <div className="flex flex-col ">
            <div
              className="flex justify-between items-center p-2 hover:bg-secondary cursor-pointer"
              onClick={() => setSheet((p) => !p)}
            >
              <div className="flex items-center gap-1">
                <Settings2 size={16} />
                <span className="text-sm">Profile</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-secondary cursor-pointer">
              <div className="flex items-center gap-1">
                <UserPlus size={16} />
                <span className="text-sm"> Create contact</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-secondary cursor-pointer">
              <div className="flex items-center gap-1">
                <VolumeOff size={16} />
                <span className="text-sm">Mute</span>
              </div>
              <Switch />
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-secondary cursor-pointer">
              <div className="flex items-center gap-1">
                {resolvedTheme === "dark" ? (
                  <Sun size={16} />
                ) : (
                  <Moon size={16} />
                )}
                <span className="text-sm">
                  {resolvedTheme === "dark " ? "Light mode" : "Dark  mode"}
                </span>
              </div>
              <Switch
                checked={resolvedTheme === "dark" ? true : false}
                onCheckedChange={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
              />
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-red-600 cursor-pointer  bg-red-700">
              <div className="flex items-center gap-1">
                <LogIn size={16} />
                <span className="text-sm "> Log out</span>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Sheet open={sheet} onOpenChange={setSheet}>
        <SheetContent side={"left"} className="w-80 p-2">
          <SheetHeader>
            <SheetTitle>Hello Brother</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
          <Separator className="my-2" />
          <div className="mx-auto w-1/2 h-36 relative">
            <Avatar className="w-full h-36">
              <AvatarFallback className="text-6x] uppercase font-spaceGrotesk*">
                SB
              </AvatarFallback>
            </Avatar>

            <Button size={"icon"} className="absolute right-0 bottom-0">
              <Upload size={16} />
            </Button>
          </div>
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>Basic Information</AccordionTrigger>
              <AccordionContent className="px-2 mt-2">
                <InformationForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Email</AccordionTrigger>
              <AccordionContent className="px-2 mt-2">
                <EmailForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Notification</AccordionTrigger>
              <AccordionContent className="px-2 mt-2">
                <NotificationForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Danger zone</AccordionTrigger>
              <AccordionContent className="px-2 mt-2">
                <DangerZoneForm />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Settings;
