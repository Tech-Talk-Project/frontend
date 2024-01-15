import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Drawer, List, ListItem } from "@material-tailwind/react";
import { MdMenu, MdClose, MdLogin } from "react-icons/md";
import Button from "../Common/Button";
import isLoggedInState from "../../recoil/atoms/auth";
import NavMenu from "./NavMenu";
import Logo from "../Common/Logo";
import { removeCookie } from "../../utils/cookie";

const MENUS = [
  { value: "Message", path: "/message" },
  { value: "Profile", path: "/profile" },
  { value: "Logout", path: "/" },
];

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    removeCookie("accessToken", { path: "/" });
    navigate("/");
  };
  const handleOpenClick = () => {
    setIsOpen((prev) => !prev);
  };
  const handleMenuClick = (value, path) => {
    setIsOpen(false);
    if (value === "Logout") {
      handleLogoutClick();
      return;
    }
    navigate(path);
  };

  return (
    <header className="fixed top-0 flex justify-center items-center w-full h-20 text-lg bg-light_black border-b border-line z-50">
      <article className="flex justify-between items-center w-full max-w-7xl px-5">
        <Logo size="md" />
        <nav>
          {isLoggedIn ? (
            <>
              <div className="md:hidden flex gap-8">
                <NavMenu>Message</NavMenu>
                <NavMenu>Profile</NavMenu>
                <button
                  className="hover:text-brand duration-100"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </div>
              <div className="hidden md:block">
                <Button
                  onClick={handleOpenClick}
                  variant="text"
                  className="p-2 text-white"
                >
                  <MdMenu size={28} />
                </Button>
                <Drawer
                  placement="top"
                  open={isOpen}
                  onClose={handleOpenClick}
                  className="p-4 !max-h-64 bg-light_black border-b border-line"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <Logo size="md" />
                    <Button
                      variant="text"
                      className="p-2 text-white"
                      onClick={handleOpenClick}
                    >
                      <MdClose size={28} />
                    </Button>
                  </div>
                  <List className="text-white">
                    {MENUS.map((menu) => (
                      <ListItem
                        ripple={false}
                        className="justify-center"
                        onClick={() => handleMenuClick(menu.value, menu.path)}
                      >
                        {menu.value}
                      </ListItem>
                    ))}
                  </List>
                </Drawer>
              </div>
            </>
          ) : (
            <>
              <NavMenu className="md:hidden">Login</NavMenu>
              <Button
                className="hidden md:block p-2 text-white"
                variant="text"
                onClick={() => navigate("/login")}
              >
                <MdLogin size={24} />
              </Button>
            </>
          )}
        </nav>
      </article>
    </header>
  );
}
