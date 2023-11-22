import React from "react";
import { NavLink } from "react-router-dom";

export default function NavMenu({ children }) {
  return (
    <NavLink
      to={`/${children.toLowerCase()}`}
      className={({ isActive }) => {
        return `hover:text-brand duration-100 ${isActive ? "text-brand" : ""}`;
      }}
    >
      {children}
    </NavLink>
  );
}
