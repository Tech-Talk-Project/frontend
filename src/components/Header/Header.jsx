import React from "react";
import Logo from "../Common/Logo";
import { useRecoilValue } from "recoil";
import isLoggedInState from "../../recoil/atoms/auth";
import NavMenu from "./NavMenu";

export default function Header() {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  return (
    <header className="flex justify-center items-center w-full h-20 text-lg border-b border-line">
      <article className="flex justify-between items-center w-full max-w-7xl px-5">
        <Logo size="123" />
        <nav className="flex gap-8">
          {isLoggedIn && (
            <>
              <NavMenu>Message</NavMenu>
              <NavMenu>Profile</NavMenu>
            </>
          )}
          <NavMenu>Login</NavMenu>
        </nav>
      </article>
    </header>
  );
}
