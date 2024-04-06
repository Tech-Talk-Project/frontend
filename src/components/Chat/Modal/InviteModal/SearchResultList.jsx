import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, List } from "@material-tailwind/react";
import SearchResultItem from "./SearchResultItem";

export default function SearchResultList({ searchData, onDialogClose }) {
  return (
    <Card className="w-full max-h-60 overflow-auto">
      <List>
        {searchData.map((member) => (
          <SearchResultItem
            key={uuidv4()}
            memberData={member}
            onDialogClose={onDialogClose}
          />
        ))}
      </List>
    </Card>
  );
}
