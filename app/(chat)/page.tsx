"use client";
import React, { useEffect, useState } from "react";
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
import { useLoading } from "@/hooks/use-loading";
import { axiosClient } from "@/http/axios";
import { useSession } from "next-auth/react";
import { generateToken } from "@/lib/generate.token";
import { IError, IUser } from "@/types";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

function HomePage() {
  const { currentContact } = useCurrentContact();
  const router = useRouter();

  const { setCreating, setLoading, isLoading } = useLoading();
  const { data: session } = useSession();
  const [Contacts, setContacts] = useState<IUser[]>([]);

  const contactForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });
  const messagForm = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      text: "",
      image: "",
    },
  });
  const getContacts = async () => {
    setLoading(true);
    const token = await generateToken(session?.currentUser?._id);
    try {
      const { data } = await axiosClient.get<{ contacts: IUser[] }>(
        "/api/user/contacts",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContacts(data?.contacts);
    } catch (error) {
      toast({ description: "Cannot fetch contacts " });
    } finally {
      setLoading(false);
    }
  };

  const onSendMessage = (value: z.infer<typeof messageSchema>) => {
    console.log(value);
  };

  const onCreateContact = async (values: z.infer<typeof emailSchema>) => {
    setCreating(true);
    const token = await generateToken(session?.currentUser?._id);

    try {
      const { data } = await axiosClient.post<{ contact: IUser }>(
        "/api/user/contact",
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setContacts((prev) => [...prev, data.contact]);
      toast({ description: "Contact added succesfully" });
      contactForm.reset();
    } catch (error: any) {
      if ((error as IError).response?.data?.message) {
        return toast({
          description: (error as IError).response.data.message,
          variant: "destructive",
        });
      }
      return toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    if (session?.currentUser?._id) {
      getContacts();
    }
  }, [session?.currentUser]);

  return (
    <div>
      <div className="w-80 h-screen border-r fixed inset-0 z-50">
        {isLoading && (
          <div className="w-full h-[95vh] flex justify-center items-center ">
            <Loader2 size={50} className="animate-spin" />
          </div>
        )}

        {!isLoading && <ContactList contacts={Contacts} />}

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
