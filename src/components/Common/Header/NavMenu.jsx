import React from "react";
import { NavLink } from "react-router-dom";

export default function NavMenu({ children, className, path, onClick }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => {
        return `hover:text-brand duration-100 ${
          isActive ? "text-brand" : ""
        } ${className}`;
      }}
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
}
