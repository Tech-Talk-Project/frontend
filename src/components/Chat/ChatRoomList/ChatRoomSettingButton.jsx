import React from "react";
import { MdOutlineMoreVert, MdExitToApp } from "react-icons/md";
import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

export default function ChatRoomSettingButton() {
  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <Button
          ripple={false}
          variant="text"
          className="p-0 text-white hover:text-blue-gray-400 duration-150"
        >
          <MdOutlineMoreVert size={20} />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <MenuItem className="flex items-center gap-2 p-2">
          <MdExitToApp size={20} />
          <Typography variant="h6">나가기</Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
