import { Typography } from "@material-tailwind/react";
import React from "react";

export default function Tag({ tag }) {
  return (
    <li className="py-[0.125rem] px-3 bg-brand rounded-md">
      <Typography variant="h6" className=" font-semibold">
        {tag}
      </Typography>
    </li>
  );
}
