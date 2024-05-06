import React from "react";
import Button from "../../Common/Button";

export default function Category({ language, filters, onFilterClick }) {
  return (
    <li>
      <Button
        className={`px-4 py-1 text-md rounded-full ${
          filters.includes(language)
            ? "bg-brand"
            : "bg-blue-gray-900 hover:bg-brand"
        }`}
        onClick={() => onFilterClick(language)}
      >
        {language}
      </Button>
    </li>
  );
}
