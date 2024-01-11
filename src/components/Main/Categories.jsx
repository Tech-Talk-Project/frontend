import React from "react";
import { v4 as uuidv4 } from "uuid";
import { CATEGORIES } from "../../constants/category";
import Category from "./Category";

export default function Categories({ filter }) {
  return (
    <ul className="flex flex-wrap gap-2 justify-center items-start px-4 py-8 w-full h-fit">
      {CATEGORIES[filter].map((language) => (
        <Category key={uuidv4()} language={language} />
      ))}
    </ul>
  );
}
