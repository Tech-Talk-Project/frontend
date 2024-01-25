import React from "react";
import { v4 as uuidv4 } from "uuid";
import { CATEGORIES } from "../../../constants/category";
import Category from "./Category";

export default function Categories({ filter, filters, onFilterClick }) {
  return (
    <ul className="flex flex-wrap gap-2 justify-center items-start pb-4 w-full h-fit">
      {CATEGORIES[filter].map((language) => (
        <Category
          key={uuidv4()}
          language={language}
          filters={filters}
          onFilterClick={onFilterClick}
        />
      ))}
    </ul>
  );
}
