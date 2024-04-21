import React from "react";
import { Chip } from "@material-tailwind/react";

export default function Tags({ tags }) {
  return (
    <article className="my-4">
      <ul className="flex flex-wrap justify-center gap-4">
        {tags.map((tag) => (
          <li>
            <Chip value={tag} size="lg" className=" bg-brand" />
          </li>
        ))}
      </ul>
    </article>
  );
}
