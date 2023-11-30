import React from "react";
import { Typography } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";

export default function Links({ links }) {
  return (
    <article className="p-4 w-full border-b border-line">
      <Typography variant="h6">Links</Typography>
      <ul className="list-disc">
        {links.map((link) => (
          <li key={uuidv4()} className="ml-4">
            {link}
          </li>
        ))}
      </ul>
    </article>
  );
}
