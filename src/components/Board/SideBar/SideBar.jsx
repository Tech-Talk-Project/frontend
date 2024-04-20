import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, List } from "@material-tailwind/react";
import { BOARD_CATEGORIE_TYPES } from "../../../constants/category";
import SideBarTypeItem from "./SideBarTypeItem";

export default function SideBar() {
  return (
    <aside className="hidden md:block fixed top-20 left-0 max-w-[16rem] w-full h-main p-4 bg-light_black border-r border-blue-gray-800">
      <Card className="w-full max-w-[16rem] bg-light_black overflow-auto rounded-none">
        <List>
          {BOARD_CATEGORIE_TYPES.map((category) => (
            <SideBarTypeItem key={uuidv4()} category={category} />
          ))}
        </List>
      </Card>
    </aside>
  );
}
