import React from "react";
import { Card, List } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import ChatRoom from "./ChatRoom";

export default function ChatRoomList({ chatRoomList }) {
  return (
    <Card className="hidden md:block w-full max-w-xs p-4 bg-light_black border-r border-line rounded-none">
      <List>
        {chatRoomList.map((chatRoom) => (
          <ChatRoom key={uuidv4()} chatRoom={chatRoom} />
        ))}
      </List>
    </Card>
  );
}
