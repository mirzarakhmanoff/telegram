"use client";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import ContactList from "./_components/contact-list";
import { useRouter } from "next/navigation";
import AddContact from "./addContact";
import { useCurrentContact } from "@/hooks/use-current";
import { useForm } from "react-hook-form";
import { emailSchema, messageSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TopChat from "./_components/top-chat";
import Chat from "./_components/chat";

function HomePage() {
  const contacts = [
    {
      email: "john@gmail.com",
      _id: "1",
      avatar: "https://github.com/shadcn.png",
      firstName: "John",
      lastName: "Doe",
      bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis repellat blanditiis hic reiciendis quibusdam voluptatem necessitatibus, minus sint maxime iste impedit cupiditate ab provident doloremque sed dicta, molestias nemo cum.",
    },
    { email: "amile@gmail.com", _id: "2", firstName: "Amile" },
    { email: "faris@gmail.com", _id: "3" },
    { email: "abdo@gmail.com", _id: "4" },
    { email: "billi@gmail.com", _id: "5" },
  ];

  const { currentContact } = useCurrentContact();
  const router = useRouter();

  const contactForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });
  const messagForm = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      text: "",
      image: "",
    },
  });

  const onSendMessage = (value: z.infer<typeof messageSchema>) => {
    console.log(value);
  };

  const onCreateContact = (values: z.infer<typeof emailSchema>) => {
    //Api call
    console.log(values);
  };

  useEffect(() => {
    router.replace("/");
  }, []);

  return (
    <div>
      <div className="w-80 h-screen border-r fixed inset-0 z-50">
        {/* <div className="w-full h-[95vh] flex justify-center items-center ">
          <Loader2 size={50} className="animate-spin" />
        </div> */}

        <ContactList contacts={contacts} />

        {/* Chat area  */}
      </div>
      <div className="pl-80 w-full">
        {/* Add contact  */}
        {!currentContact?._id && (
          <AddContact
            contactForm={contactForm}
            onCreateContact={onCreateContact}
          />
        )}
        {/* chat */}
        {currentContact?._id && (
          <div className="w-full relative">
            {/* {Top chat } */}
            <TopChat />
            {/* {Chat messages} */}
            <Chat messageForm={messagForm} onSendMessage={onSendMessage} />
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
