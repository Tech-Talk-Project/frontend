import React from "react";
import { Card, List } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import SideBarCategoryItem from "./SideBarCategoryItem";
import { CATEGORIES } from "../../../constants/category";

export default function SideBarCategoryList({ createNewChat }) {
  return (
    <Card
      className={`w-full max-w-[16rem] ${
        createNewChat ? "h-1/2" : ""
      } bg-light_black overflow-auto rounded-none`}
    >
      <List className="min-w-0 rounded-none">
        {Object.keys(CATEGORIES).map((category) => (
          <SideBarCategoryItem key={uuidv4()} category={category} />
        ))}
      </List>
    </Card>
  );
}
