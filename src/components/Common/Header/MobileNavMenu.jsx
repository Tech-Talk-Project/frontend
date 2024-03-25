import React from "react";
import { ListItem } from "@material-tailwind/react";

export default function MobileNavMenu({ menu, onMenuClick }) {
  return (
    <ListItem ripple={false} onClick={() => onMenuClick(menu.value, menu.path)}>
      {menu.value}
    </ListItem>
  );
}
