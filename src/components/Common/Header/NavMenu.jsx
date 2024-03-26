import React from "react";
import { NavLink } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import newChatMemberState from "../../../recoil/atoms/newChatMember";

export default function NavMenu({ children, className, path }) {
  const setNewChatMembers = useSetRecoilState(newChatMemberState);

  const handleClick = () => {
    setNewChatMembers([]);
  };
  return (
    <NavLink
      to={path}
      className={({ isActive }) => {
        return `hover:text-brand duration-100 ${
          isActive ? "text-brand" : ""
        } ${className}`;
      }}
      onClick={handleClick}
    >
      {children}
    </NavLink>
  );
}
