import React from "react";
import { ListItem } from "@material-tailwind/react";

export default function MobileNavMenu({ menu: { value, path }, onMenuClick }) {
  const handleClick = () => onMenuClick(value, path);

  return (
    <ListItem ripple={false} onClick={handleClick}>
      {value}
    </ListItem>
  );
}
