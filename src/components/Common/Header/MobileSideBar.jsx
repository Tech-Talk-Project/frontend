import React from "react";
import { v4 as uuidv4 } from "uuid";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Drawer, List, ListItem } from "@material-tailwind/react";
import Logo from "../Image/Logo";
import Button from "../Button";
import MobileNavMenu from "./MobileNavMenu";
import { CATEGORIES, BOARD_CATEGORIE_TYPES } from "../../../constants/category";
import SideBarCategoryItem from "../../Main/SideBar/SideBarCategoryItem";
import { logout } from "../../../apis/auth";
import { isLoggedInState, memberIdState } from "../../../recoil/atoms/auth";
import {
  createNewChatState,
  newChatMemberState,
} from "../../../recoil/atoms/newChat";
import { removeCookie } from "../../../utils/cookie";
import { sideBarMenuStyle } from "../../../utils/sideBarMenuStyle";
import filterState from "../../../recoil/atoms/filter";
import SideBarTypeItem from "../../Board/Board/SideBar/SideBarTypeItem";
import useToast from "../../../hooks/useToast";
import { PATH } from "../../../constants/path";

// login state: 1, logout state: -1, both: 0
const MENUS = [
  { value: "Home", path: "/", loginReq: 0 },
  { value: "Board", path: "/board?type=project", loginReq: 0 },
  { value: "Chat", path: "/chatList", loginReq: 1 },
  { value: "Profile", path: "/profile", loginReq: 1 },
  { value: "Login", path: "/login", loginReq: -1 },
];

export default function MobileSideBar({ isOpen, onOpenClick, pathname }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useRecoilState(filterState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const setMemberId = useSetRecoilState(memberIdState);
  const setCreateNewChat = useSetRecoilState(createNewChatState);
  const setNewChatMembers = useSetRecoilState(newChatMemberState);
  const { showToast } = useToast();

  const handleFollowClick = () => {
    setFilter("");
  };
  const handleLogoutClick = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      setMemberId(null);
      setCreateNewChat(false);
      setNewChatMembers([]);
      removeCookie("accessToken", { path: "/" });
      navigate(PATH.home);
      onOpenClick();
    } catch (error) {
      showToast("잠시후에 다시 시도해 주세요.");
    }
  };
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
        {MENUS.filter((menu) =>
          isLoggedIn ? menu.loginReq >= 0 : menu.loginReq <= 0
        ).map((menu) => (
          <MobileNavMenu key={uuidv4()} menu={menu} onClick={onOpenClick} />
        ))}
        {isLoggedIn && (
          <Button
            variant="text"
            className="p-3 text-white text-left text-base font-normal"
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
        )}
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
            <hr className="mt-2 mb-4" />
            <ListItem
              ripple={false}
              className={sideBarMenuStyle(filter.length === 0)}
              onClick={handleFollowClick}
            >
              FOLLOWING
            </ListItem>
          </>
        )}
        {pathname === "/board" && (
          <>
            <hr className="mt-2 mb-4" />
            {BOARD_CATEGORIE_TYPES.map((category) => (
              <SideBarTypeItem
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
