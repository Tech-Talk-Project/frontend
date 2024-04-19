import React from "react";
import { v4 as uuidv4 } from "uuid";
import { MdClose } from "react-icons/md";
import { Drawer, List } from "@material-tailwind/react";
import Logo from "../Image/Logo";
import Button from "../Button";
import MobileNavMenu from "./MobileNavMenu";
import { CATEGORIES } from "../../../constants/category";
import SideBarCategoryItem from "../../Main/SideBar/SideBarCategoryItem";

const MENUS = [
  { value: "Home", path: "/" },
  { value: "Chat", path: "/chatList" },
  { value: "Profile", path: "/profile" },
  { value: "Logout", path: "/" },
];

export default function MobileSideBar({
  isOpen,
  onOpenClick,
  pathname,
  onMenuClick,
}) {
  return (
    <Drawer
      open={isOpen}
      onClose={onOpenClick}
      className="p-4 bg-light_black border-r border-line overflow-auto"
    >
      <div className="mb-6 flex items-center justify-between">
        <Logo size="md" />
        <Button variant="text" className="p-1 text-white" onClick={onOpenClick}>
          <MdClose size={24} />
        </Button>
      </div>
      <List className="text-white">
        {MENUS.map((menu) => (
          <MobileNavMenu key={uuidv4()} menu={menu} onMenuClick={onMenuClick} />
        ))}
        {pathname === "/" && (
          <>
            <hr className="mt-2 mb-4" />
            {Object.keys(CATEGORIES).map((category) => (
              <SideBarCategoryItem
                key={uuidv4()}
                category={category}
                onCategoryClick={onOpenClick}
              />
            ))}
          </>
        )}
      </List>
    </Drawer>
  );
}
