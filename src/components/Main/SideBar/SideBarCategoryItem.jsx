import React from "react";
import { useRecoilState } from "recoil";
import { ListItem } from "@material-tailwind/react";
import filterState from "../../../recoil/atoms/filter";
import { sideBarMenuStyle } from "../../../utils/sideBarMenuStyle";

export default function SideBarCategoryItem({ category, onCategoryClick }) {
  const [filter, setFilter] = useRecoilState(filterState);

  const handleClick = () => {
    setFilter(category);
    onCategoryClick && onCategoryClick();
  };

  return (
    <ListItem
      ripple={false}
      className={sideBarMenuStyle(filter === category)}
      onClick={handleClick}
    >
      {category.toUpperCase()}
    </ListItem>
  );
}
