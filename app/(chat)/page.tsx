"use client";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import ContactList from "./_components/contact-list";
import { useRouter } from "next/navigation";
import AddContact from "./addContact";
import { useCurrentContact } from "@/hooks/use-current";
import { useForm } from "react-hook-form";
import { emailSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

function HomePage() {
  const contacts = [
    { email: "john@gmail.com", _id: "1" },
    { email: "selena@gmail.com", _id: "2" },
    { email: "azamat@gmail.com", _id: "3" },
    { email: "samandar@gmail.com", _id: "4" },
    { email: "sarvar@gmail.com", _id: "5" },
    { email: "ulugbek@gmail.com", _id: "6" },
  ];

  const { currentContact } = useCurrentContact();
  const router = useRouter();

  const contactForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

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
        {currentContact?._id && <div>hello</div>}
      </div>
    </div>
  );
}

export default HomePage;
