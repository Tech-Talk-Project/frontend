import React from "react";
import { useRecoilValue } from "recoil";
import isLoggedInState from "../../recoil/atoms/auth";
import NavMenu from "./NavMenu";
import Logo from "../Common/Logo";

export default function Header() {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  return (
    <header className="flex justify-center items-center w-full h-20 text-lg border-b border-line">
      <article className="flex justify-between items-center w-full max-w-7xl px-5">
        <Logo size="123" />
        <nav className="flex gap-8">
          {isLoggedIn ? (
            <>
              <NavMenu>Message</NavMenu>
              <NavMenu>Profile</NavMenu>
              <button className="hover:text-brand duration-100">Logout</button>
            </>
          ) : (
            <NavMenu>Login</NavMenu>
          )}
        </nav>
      </article>
    </header>
  );
}
