import React from "react";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { ListItem } from "@material-tailwind/react";
import filterState from "../../recoil/atoms/filter";
import { CATEGORIES } from "../../constants/category";

export default function CategoryMenus() {
  const [filter, setFilter] = useRecoilState(filterState);

  return (
    <>
      {Object.keys(CATEGORIES).map((category) => (
        <ListItem
          key={uuidv4()}
          ripple={false}
          className={`text-white ${
            category === filter ? "bg-blue-gray-50 bg-opacity-80" : ""
          }`}
          onClick={() => setFilter(category)}
        >
          {category.toUpperCase()}
        </ListItem>
      ))}
    </>
  );
}
