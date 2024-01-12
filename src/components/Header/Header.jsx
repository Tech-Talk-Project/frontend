import React from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import isLoggedInState from "../../recoil/atoms/auth";
import NavMenu from "./NavMenu";
import Logo from "../Common/Logo";
import { removeCookie } from "../../utils/cookie";

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    removeCookie("accessToken", { path: "/" });
    navigate("/");
  };

  return (
    <header className="fixed top-0 flex justify-center items-center w-full h-20 text-lg bg-light_black border-b border-line z-50">
      <article className="flex justify-between items-center w-full max-w-7xl px-5">
        <Logo size="md" />
        <nav className="flex gap-8">
          {isLoggedIn ? (
            <>
              <NavMenu>Message</NavMenu>
              <NavMenu>Profile</NavMenu>
              <button
                className="hover:text-brand duration-100"
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            </>
          ) : (
            <NavMenu>Login</NavMenu>
          )}
        </nav>
      </article>
    </header>
  );
}
