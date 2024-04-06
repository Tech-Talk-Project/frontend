import React from "react";
import { ListItem, Typography } from "@material-tailwind/react";
import ProfileImage from "../../../Common/Image/ProfileImage";

export default function SearchResultItem({
  memberData: { memberId, name, email, imageUrl },
}) {
  return (
    <ListItem className="gap-3">
      <ProfileImage size="sm" imageUrl={imageUrl} />
      <div>
        <Typography variant="h6">{name}</Typography>
        <Typography>{email}</Typography>
      </div>
    </ListItem>
  );
}
