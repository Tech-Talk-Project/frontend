import React from "react";
import { Typography } from "@material-tailwind/react";

const colors = {
  brand: "bg-brand",
  gray: "bg-blue-gray-200 text-black",
};

const sizes = {
  md: "py-[0.125rem] px-3",
  sm: "py[0.0625rem] px-2",
};

export default function Tag({ tag, color, size }) {
  return (
    <li className={`${sizes[size]} ${colors[color]} rounded-md`}>
      <Typography variant="h6" className=" font-semibold">
        {tag}
      </Typography>
    </li>
  );
}
