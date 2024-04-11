import React from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  List,
  Card,
} from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import Button from "../../Common/Button";
import ChatRoomMemberItem from "./ChatRoomMemberItem";

export default function ChatRoomMembersModal({
  isOpen,
  onClick,
  ownerId,
  members,
}) {
  return (
    <Dialog open={isOpen} handler={onClick} size="xs">
      <DialogBody className="max-h-80 overflow-y-auto">
        <Card>
          <List>
            {members.map((member) => (
              <ChatRoomMemberItem
                key={uuidv4()}
                member={member}
                ownerId={ownerId}
              />
            ))}
          </List>
        </Card>
      </DialogBody>
      <DialogFooter className="py-2 px-4">
        <Button onClick={onClick} className="bg-brand text-sm">
          확인
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
