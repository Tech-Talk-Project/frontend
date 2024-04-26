import React from "react";
import ProfileImage from "../../../Common/Image/ProfileImage";
import { Typography } from "@material-tailwind/react";
import Content from "../Common/Content";
import { getDateInfo } from "../../../../utils/date";

export default function Comment({
  comment: {
    author: { name, imageUrl },
    content,
    createdAt,
    updatedAt,
  },
}) {
  return (
    <li className="border-b border-blue-gray-800">
      <div className="flex justify-between items-end gap-4 pl-4">
        <div className="flex items-center gap-4">
          <ProfileImage size="sm" imageUrl={imageUrl} />
          <Typography variant="h5">{name}</Typography>
        </div>
        <Typography>
          {updatedAt
            ? getDateInfo(new Date(updatedAt))
            : getDateInfo(new Date(createdAt))}
        </Typography>
      </div>
      <Content content={content} />
    </li>
  );
}
