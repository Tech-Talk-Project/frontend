import React from "react";
import { Card, List, ListItem } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import SideBarCategoryItem from "./SideBarCategoryItem";
import { CATEGORIES } from "../../../constants/category";
import { useRecoilState, useRecoilValue } from "recoil";
import filterState from "../../../recoil/atoms/filter";
import { isLoggedInState } from "../../../recoil/atoms/auth";

export default function SideBarCategoryList({ createNewChat }) {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [filter, setFilter] = useRecoilState(filterState);

  const handleFollowClick = () => {
    setFilter("");
  };
  return (
    <Card
      className={`w-full max-w-[16rem] ${
        createNewChat ? "h-1/2" : ""
      } bg-light_black overflow-auto rounded-none`}
    >
      <List className="min-w-0 rounded-none">
        {Object.keys(CATEGORIES).map((category) => (
          <SideBarCategoryItem key={uuidv4()} category={category} />
        ))}
        {isLoggedIn && (
          <div className="pt-2 border-t border-blue-gray-100">
            <ListItem
              ripple={false}
              className={`text-white ${
                filter.length === 0 ? "bg-blue-gray-50 bg-opacity-80" : ""
              }`}
              onClick={handleFollowClick}
            >
              FOLLOWING
            </ListItem>
          </div>
        )}
      </List>
    </Card>
  );
}
