import { Loader2 } from "lucide-react";
import React from "react";
import ContactList from "./_components/contact-list";

function HomePage() {
  const contacts = [
    { email: "john@gmail.com", _id: "1" },
    { email: "selena@gmail.com", _id: "2" },
    { email: "azamat@gmail.com", _id: "3" },
    { email: "samandar@gmail.com", _id: "4" },
    { email: "sarvar@gmail.com", _id: "5" },
    { email: "ulugbek@gmail.com", _id: "6" },
  ];
  return (
    <div>
      <div className="w-80 h-screen border-r fixed inset-0 z-50">
        {/* <div className="w-full h-[95vh] flex justify-center items-center ">
          <Loader2 size={50} className="animate-spin" />
        </div> */}

        <ContactList contacts={contacts} />
      </div>
    </div>
  );
}

export default HomePage;
