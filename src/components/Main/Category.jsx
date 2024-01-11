import React from "react";
import Button from "../Common/Button";

export default function Category({ language }) {
  return (
    <li>
      <Button className="px-4 py-1 text-md rounded-full bg-dark_gray hover:bg-brand">
        {language.title}
      </Button>
    </li>
  );
}
