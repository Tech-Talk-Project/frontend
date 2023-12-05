import React from "react";
import { Typography } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";

export default function Links({ links }) {
  return (
    <article className="p-4 w-full border-b border-line">
      <Typography variant="h6">Links</Typography>
      {links.length === 0 ? (
        <Typography variant="paragraph" className="font-normal text-gray-600">
          자신을 소개할 수 있는 링크를 추가해보세요.
        </Typography>
      ) : (
        <ul>
          {links.map((link) => (
            <li key={uuidv4()}>{link}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
