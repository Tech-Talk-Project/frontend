import React from "react";
import { Card, List } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import SideBarNewChatMember from "./SideBarNewChatMember";

export default function SideBarNewChatMemberList({ newChatMembers }) {
  return (
    <Card className="w-full bg-inherit shadow-none overflow-auto">
      <List className="min-w-0 text-white">
        {newChatMembers.map((member) => (
          <SideBarNewChatMember key={uuidv4()} member={member} />
        ))}
      </List>
    </Card>
  );
}
