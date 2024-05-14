import React from "react";
import { useSearchParams } from "react-router-dom";
import { ListItem } from "@material-tailwind/react";
import { sideBarMenuStyle } from "../../../../utils/sideBarMenuStyle";

export default function SideBarTypeItem({ category, onCategoryClick }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");

  const handleClick = () => {
    onCategoryClick && onCategoryClick();
    if (type === category) return;
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
