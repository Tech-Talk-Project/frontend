import { Typography } from "@material-tailwind/react";
import React from "react";

export default function Description({ description }) {
  return (
    <article className="p-4 w-full h-full border border-line rounded-md">
      <Typography variant="paragraph" className="font-normal">
        {description ? description : ""}
      </Typography>
    </article>
  );
}
