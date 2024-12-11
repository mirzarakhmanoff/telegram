import MessageCard from "@/components/cards/message.card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ChatLoading from "@/components/ui/loaders/chat.loading";
import { messageSchema } from "@/lib/validation";
import { Paperclip, Send, Smile } from "lucide-react";
import React, { FC, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import emojies from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "next-themes";

interface Props {
  onSendMessage: (value: z.infer<typeof messageSchema>) => void;
  messageForm: UseFormReturn<z.infer<typeof messageSchema>>;
}

const Chat: FC<Props> = ({ onSendMessage, messageForm }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { resolvedTheme } = useTheme();

  const handleEmojiSelect = (emoji: any) => {
    const input = inputRef.current;
    if (!input) return;
    const text = messageForm.getValues("text");
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;
    const newText = text.slice(0, start) + emoji.native + text.slice(end);

    messageForm.setValue("text", newText);

    setTimeout(() => {
      input.setSelectionRange(
        start + emoji.native.length,
        start + emoji.native.length
      );
    }, 0);
  };
  return (
    <div className="flex flex-col justify-end z-40 min-h-[50vh] h-[88vh]">
      {/* {Loading} */}
      {/* <ChatLoading /> */}
      {/* Messages  */}
      {/* <MessageCard /> */}

      {/* {Start chatting} */}
      <div className="w-full h-[88vh] flex items-center justify-center">
        <div
          className="text-[100px] cursor-pointer"
          onClick={() => onSendMessage({ text: "✌" })}
        >
          ✌
        </div>
      </div>
      {/* {Message input} */}
      <Form {...messageForm}>
        <form
          onSubmit={messageForm.handleSubmit(onSendMessage)}
          className="w-full flex relative"
        >
          <Button size={"icon"} type="button" variant={"secondary"}>
            <Paperclip />
          </Button>
          <FormField
            control={messageForm.control}
            name="text"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="bg-secondary border-l border-l-muted-foreground border-r border-r-muted-foreground h-9"
                    placeholder="Type a message"
                    value={field.value}
                    onBlur={() => field.onBlur()}
                    onChange={(e) => field.onChange(e.target.value)}
                    ref={inputRef}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button size={"icon"} type="button" variant={"secondary"}>
                <Smile />
              </Button>
            </PopoverTrigger>
            <PopoverContent className=" border-none mr-20 ">
              <Picker
                data={emojies}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                onEmojiSelect={(emoji: { native: string }) =>
                  handleEmojiSelect(emoji)
                }
              />
            </PopoverContent>
          </Popover>

          <Button type="submit" size={"icon"}>
            <Send />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Chat;
