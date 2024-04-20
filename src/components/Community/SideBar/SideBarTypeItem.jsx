import React from "react";
import { ListItem } from "@material-tailwind/react";
import { sideBarMenuStyle } from "../../../utils/sideBarMenuStyle";

export default function SideBarTypeItem({ category, type, onTypeClick }) {
  const handleClick = () => {
    onTypeClick(category);
  };
  return (
    <ListItem
      ripple={false}
      className={sideBarMenuStyle(type === category)}
      onClick={handleClick}
    >
      {category.toUpperCase()}
    </ListItem>
  );
}
