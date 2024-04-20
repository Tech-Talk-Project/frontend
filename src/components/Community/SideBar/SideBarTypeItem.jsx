import React from "react";
import { useRecoilState } from "recoil";
import { ListItem } from "@material-tailwind/react";
import typeState from "../../../recoil/atoms/type";
import { sideBarMenuStyle } from "../../../utils/sideBarMenuStyle";

export default function SideBarTypeItem({ category, onCategoryClick }) {
  const [type, setType] = useRecoilState(typeState);

  const handleClick = () => {
    setType(category);
    onCategoryClick && onCategoryClick();
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
