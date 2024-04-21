import { Chip } from "@material-tailwind/react";
import React from "react";

export default function Tag({ tag }) {
  return (
    <li>
      <Chip value={tag} size="lg" className=" bg-brand" />
    </li>
  );
}
