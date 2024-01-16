import React from "react";
import { Card, List } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import { CATEGORIES } from "../../constants/category";
import CategoryMenu from "./CategoryMenu";

export default function SideBar() {
  return (
    <Card className="hidden md:block fixed top-20 left-0 w-full max-w-[16rem] h-screen p-4 bg-light_black border-r border-line rounded-none">
      <List>
        {Object.keys(CATEGORIES).map((category) => (
          <CategoryMenu key={uuidv4()} category={category} />
        ))}
      </List>
    </Card>
  );
}
