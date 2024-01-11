import React from "react";
import { Card, List, ListItem } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import { CATEGORIES } from "../../constants/category";

export default function SideBar({ onFilterClick }) {
  return (
    <Card className="w-full max-w-[16rem] h-screen p-4 bg-black border-r border-line">
      <List>
        {Object.keys(CATEGORIES).map((category) => (
          <ListItem
            key={uuidv4()}
            ripple={false}
            className="text-white"
            onClick={() => onFilterClick(category)}
          >
            {category.toUpperCase()}
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
