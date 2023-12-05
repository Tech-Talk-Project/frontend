import { Typography } from "@material-tailwind/react";
import React from "react";

export default function Introduction({ introduction }) {
  return (
    <article className="p-4 w-full border-b border-line">
      <Typography variant="h6">Introduction</Typography>
      <Typography
        variant="paragraph"
        className={`font-normal ${introduction ? "" : "text-gray-600"}`}
      >
        {introduction ? introduction : "한 줄 소개글을 적어보세요."}
      </Typography>
    </article>
  );
}
