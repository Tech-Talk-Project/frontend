import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  List,
  ListItem,
  ListItemPrefix,
  Card,
  Typography,
} from "@material-tailwind/react";
import ProfileImage from "../../Common/Image/ProfileImage";
import Button from "../../Common/Button";

export default function ChatRoomMembersModal({ isOpen, onClick, members }) {
  const handleDialogOpen = (e) => {
    e.stopPropagation();
    onClick();
  };
  return (
    <Dialog
      open={isOpen}
      handler={handleDialogOpen}
      size="xs"
      className=" max-h-96 overflow-y-auto"
    >
      <DialogBody>
        <Card>
          <List>
            {members.map((member) => (
              <ListItem key={uuidv4()} ripple={false}>
                <ListItemPrefix>
                  <ProfileImage imageUrl={member.imageUrl} size="sm" />
                </ListItemPrefix>
                <Typography variant="h6" color="blue-gray">
                  {member.name}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Card>
      </DialogBody>
      <DialogFooter className="pb-2 pt-0 px-4">
        <Button onClick={onClick} className="bg-brand text-sm">
          확인
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
