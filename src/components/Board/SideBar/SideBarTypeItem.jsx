import React from "react";
import { ListItem } from "@material-tailwind/react";
import { sideBarMenuStyle } from "../../../utils/sideBarMenuStyle";
import { useSearchParams } from "react-router-dom";

export default function SideBarTypeItem({ category, onCategoryClick }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");

  const handleClick = () => {
    onCategoryClick && onCategoryClick();
    setSearchParams({ type: category });
  };
  return (
    <ListItem
      ripple={false}
      className={sideBarMenuStyle(type === category)}
      onClick={handleClick}
    >
      {category.toUpperCase()}
    </ListItem>
  );
}
