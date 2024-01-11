import React from "react";
import Button from "../Common/Button";

export default function Category({ language, filters, onFilterClick }) {
  return (
    <li>
      <Button
        className={`px-4 py-1 text-md rounded-full ${
          filters.includes(language.title)
            ? "bg-brand"
            : "bg-dark_gray hover:bg-brand"
        }`}
        onClick={() => onFilterClick(language.title)}
      >
        {language.title}
      </Button>
    </li>
  );
}
