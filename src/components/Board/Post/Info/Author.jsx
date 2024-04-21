import React from "react";
import { Typography } from "@material-tailwind/react";
import ProfileImage from "../../../Common/Image/ProfileImage";

export default function Author({ imageUrl, name }) {
  return (
    <article className="flex items-center justify-center gap-4 mt-4">
      <ProfileImage imageUrl={imageUrl} size="md" />
      <Typography variant="h5">{name}</Typography>
    </article>
  );
}
