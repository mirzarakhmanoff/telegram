import { IUser } from "@/types";
import React, { FC } from "react";

interface Props {
  contacts: IUser;
}

const ContactList: FC<Props> = ({ contacts }) => {
  return (
    <>
      <div className="flex items-center  bg-background pl-2 sticky top-0"></div>
    </>
  );
};

export default ContactList;
