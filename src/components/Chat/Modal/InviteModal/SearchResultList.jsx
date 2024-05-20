import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, List } from "@material-tailwind/react";
import SearchResultItem from "./SearchResultItem";

export default function SearchResultList({
  color,
  absolute,
  searchData,
  onDialogClose,
}) {
  return (
    <Card
      className={`${
        absolute ? "absolute top-2 border border-blue-gray-800 z-30" : ""
      } w-full max-h-60 overflow-auto ${
        color === "black" ? "bg-light_black" : ""
      }`}
    >
      <List>
        {searchData.map((member) => (
          <SearchResultItem
            key={uuidv4()}
            color={color}
            memberData={member}
            onDialogClose={onDialogClose}
          />
        ))}
      </List>
    </Card>
  );
}
