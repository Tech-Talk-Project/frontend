import React from "react";
import { Card, List } from "@material-tailwind/react";
import CategoryMenus from "./CategoryMenus";

export default function SideBar() {
  return (
    <Card className="hidden md:block fixed top-20 left-0 w-full max-w-[16rem] h-screen p-4 bg-light_black border-r border-line rounded-none">
      <List>
        <CategoryMenus />
      </List>
    </Card>
  );
}
