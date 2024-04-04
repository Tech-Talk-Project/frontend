import React from "react";
import { Typography } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import Link from "../../../Profile/Link/Link";

export default function Links({ links }) {
  return (
    <article
      className={`border-b border-blue-gray-600 md:border-none md:px-4 ${
        links.length !== 0 ? "pb-2" : "pb-10"
      } w-full`}
    >
      <Typography variant="h5">LINKS</Typography>
      <ul className="flex flex-col gap-1">
        {links.map((link) => (
          <li key={uuidv4()}>
            <Link link={link} />
          </li>
        ))}
      </ul>
    </article>
  );
}
