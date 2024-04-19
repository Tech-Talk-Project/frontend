import React from "react";
import NavMenu from "./NavMenu";

export default function MobileNavMenu({ menu: { value, path }, onClick }) {
  return (
    <NavMenu path={path} className="p-3" onClick={onClick}>
      {value}
    </NavMenu>
  );
}
