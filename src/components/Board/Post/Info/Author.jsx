import React from "react";
import { Typography } from "@material-tailwind/react";
import ProfileImage from "../../../Common/Image/ProfileImage";

export default function Author({ imageUrl, name }) {
  return (
    <article className="flex flex-col gap-2 mt-4 p-4 border border-brand border-opacity-60 rounded-md">
      <Typography variant="h6">작성자</Typography>
      <div className="flex items-center gap-4">
        <ProfileImage imageUrl={imageUrl} size="md" />
        <Typography variant="h5">{name}</Typography>
      </div>
    </article>
  );
}
