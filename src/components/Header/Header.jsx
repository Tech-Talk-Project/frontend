import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Drawer, List, ListItem } from "@material-tailwind/react";
import { MdMenu, MdClose, MdLogin } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import Button from "../Common/Button";
import isLoggedInState from "../../recoil/atoms/auth";
import NavMenu from "./NavMenu";
import Logo from "../Common/Logo";
import { removeCookie } from "../../utils/cookie";
import { CATEGORIES } from "../../constants/category";
import CategoryMenus from "../Main/CategoryMenus";

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
              <div className="md:flex hidden gap-8">
                <NavMenu>Message</NavMenu>
                <NavMenu>Profile</NavMenu>
                <button
                  className="hover:text-brand duration-100"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </div>
              <div className="md:hidden">
                <Button
                  onClick={handleOpenClick}
                  variant="text"
                  className="p-2 text-white"
                >
                  <MdMenu size={28} />
                </Button>
                <Drawer
                  open={isOpen}
                  onClose={handleOpenClick}
                  className="p-4 bg-light_black border-r border-line"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <Logo size="md" />
                    <Button
                      variant="text"
                      className="p-2 text-white"
                      onClick={handleOpenClick}
                    >
                      <MdClose size={24} />
                    </Button>
                  </div>
                  <List className="text-white">
                    {MENUS.map((menu) => (
                      <ListItem
                        key={uuidv4()}
                        ripple={false}
                        onClick={() => handleMenuClick(menu.value, menu.path)}
                      >
                        {menu.value}
                      </ListItem>
                    ))}
                    <hr className="my-1" />
                    <CategoryMenus />
                  </List>
                </Drawer>
              </div>
            </>
          ) : (
            <>
              <NavMenu className="hidden md:block">Login</NavMenu>
              <Button
                className="md:hidden p-2 text-white"
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
