import { Typography } from "@material-tailwind/react";
import React from "react";

export default function Introduction({ introduction }) {
  return (
    <article className="p-4 w-full border-b border-line">
      <Typography variant="h6">Introduction</Typography>
      <Typography variant="paragraph" className="font-normal">
        {introduction}
      </Typography>
    </article>
  );
}
