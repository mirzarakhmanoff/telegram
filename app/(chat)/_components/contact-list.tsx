"use client";

import React, { FC, useState } from "react";
import { IUser } from "@/types";
import Settings from "./settings";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCurrentContact } from "@/hooks/use-current";
import { useAuth } from "@/hooks/use-auth";

interface Props {
  contacts: IUser[];
}

const ContactList: FC<Props> = ({ contacts }) => {
  const router = useRouter();
  const { currentContact, setCurrentContact } = useCurrentContact();
  const [query, setQuery] = useState("");
  const { onlineUsers } = useAuth();
  const filteredContacts = contacts.filter((contacts) =>
    contacts.email.toLowerCase().includes(query.toLowerCase())
  );

  const renderContact = (contact: IUser) => {
    const onChat = () => {
      if (currentContact?._id === contact?._id) return;
      setCurrentContact(contact);
      router.push(`/?chat=${contact._id}`);
    };

    return (
      <div
        key={contact._id}
        className={cn(
          "flex justify-between items-center cursor-pointer hover:bg-secondary/50 p-2",
          currentContact?._id === contact._id && "bg-secondary/50"
        )}
        onClick={onChat}
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <Avatar className="z-40">
              <AvatarImage
                src={contact.avatar}
                alt={contact.email}
                className="object-cover"
              />
              <AvatarFallback className="uppercase">
                {contact.email[0]}
              </AvatarFallback>
            </Avatar>
            {onlineUsers.some((user) => console.log(user))}
          </div>
          <div>
            <h2 className="capitalize line-clamp-1 text-sm">
              {contact.email.split("@")[0]}
            </h2>
            <p className="text-xs line-clamp-1 text-muted-foreground">
              No message yet
            </p>
          </div>
        </div>
        <div className="self-end ">
          <p className="text-xs text-muted-foreground">19:20 pm</p>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Поиск */}
      <div className="flex items-center justify-center bg-background pl-2 sticky top-0">
        <Settings />
        <div className="m-2 w-full">
          <Input
            className="bg-secondary"
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Список контактов */}

      {filteredContacts.length === 0 ? (
        <div className="text-center p-4">
          <p>Contact list is empty</p>
        </div>
      ) : (
        filteredContacts.map(renderContact)
      )}
    </>
  );
};

export default ContactList;
