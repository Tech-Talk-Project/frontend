import React from "react";
import { useRecoilState } from "recoil";
import { ListItem } from "@material-tailwind/react";
import filterState from "../../recoil/atoms/filter";

export default function CategoryMenu({ category, onCategoryClick }) {
  const [filter, setFilter] = useRecoilState(filterState);

  const handleClick = () => {
    setFilter(category);
    onCategoryClick && onCategoryClick();
  };

  return (
    <ListItem
      ripple={false}
      className={`text-white ${
        category === filter ? "bg-blue-gray-50 bg-opacity-80" : ""
      }`}
      onClick={handleClick}
    >
      {category.toUpperCase()}
    </ListItem>
  );
}
