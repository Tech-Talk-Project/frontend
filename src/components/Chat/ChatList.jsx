import React from "react";
import {
  Card,
  List,
  ListItem,
  Typography,
  Chip,
} from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";

export default function ChatList({ chatRoomList }) {
  return (
    <Card className="hidden md:block w-full max-w-xs p-4 bg-light_black border-r border-line rounded-none">
      <List>
        {chatRoomList.map((chatRoom) => (
          <div
            key={uuidv4()}
            className="flex flex-col gap-2 p-4 text-white border border-line rounded-lg hover:border-brand duration-150 cursor-pointer"
          >
            <div className="flex justify-between items-center w-full">
              <Typography variant="h6">{chatRoom.title}</Typography>
              <Typography variant="small">12:34</Typography>
            </div>
            <div className="flex justify-between items-center w-full">
              <Typography
                variant="paragraph"
                className="mr-2 font-normal truncate"
              >
                {chatRoom.lastMessages[0]}
              </Typography>
              <Chip
                size="sm"
                value={chatRoom.unreadCount}
                className="bg-brand"
              />
            </div>
          </div>
        ))}
      </List>
    </Card>
  );
}
