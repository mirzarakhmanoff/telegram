import { useState } from "react";
import { IUser } from "@/types";

const useCurrentContact = (): [
  IUser | null,
  React.Dispatch<React.SetStateAction<IUser | null>>
] => {
  const [currentContact, setCurrentContact] = useState<IUser | null>(null);
  return [currentContact, setCurrentContact];
};

export default useCurrentContact;
