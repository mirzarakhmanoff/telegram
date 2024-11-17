import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import React from "react";

function Settings() {
  return (
    <Button variant={"secondary"}>
      <Menu />
    </Button>
  );
}

export default Settings;
