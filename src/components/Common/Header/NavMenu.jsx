import React from "react";
import { NavLink } from "react-router-dom";

export default function NavMenu({ children, className, path }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => {
        return `hover:text-brand duration-100 ${
          isActive ? "text-brand" : ""
        } ${className}`;
      }}
    >
      {children}
    </NavLink>
  );
}
