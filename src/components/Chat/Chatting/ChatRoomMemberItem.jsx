import React from "react";
import {
  Chip,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import ProfileImage from "../../Common/Image/ProfileImage";

export default function ChatRoomMemberItem({
  member: { imageUrl, name, memberId },
  ownerId,
}) {
  return (
    <ListItem ripple={false} className="flex justify-between items-center px-4">
      <div className="flex items-center">
        <ListItemPrefix className="shrink-0">
          <ProfileImage imageUrl={imageUrl} size="sm" />
        </ListItemPrefix>
        <Typography variant="h6" color="blue-gray" className="break-all">
          {name}
        </Typography>
      </div>
      {memberId === ownerId && <Chip value="방장" className="bg-brand" />}
    </ListItem>
  );
}
