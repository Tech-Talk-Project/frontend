import { Typography } from "@material-tailwind/react";
import React from "react";

export default function Introduction({ introduction }) {
  return (
    <article
      className={`md:px-4 w-full ${
        introduction ? "pb-2" : "pb-10"
      } border-b border-blue-gray-600`}
    >
      <Typography variant="h5">INTRODUCTION</Typography>
      <Typography>{introduction || ""}</Typography>
    </article>
  );
}
