import React, { memo, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, List } from "@material-tailwind/react";
import { useRecoilState, useRecoilValue } from "recoil";
import SideBarCategoryItem from "./SideBarCategoryItem";
import { CATEGORIES } from "../../../constants/category";
import filterState from "../../../recoil/atoms/filter";
import { isLoggedInState } from "../../../recoil/atoms/auth";
import FollowingBtn from "./FollowingBtn";

const SideBarCategoryList = ({ createNewChat }) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [filter, setFilter] = useRecoilState(filterState);

  const handleFollowClick = useCallback(() => {
    setFilter("");
  }, [setFilter]);
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
          <FollowingBtn filter={filter} onFollowClick={handleFollowClick} />
        )}
      </List>
    </Card>
  );
};

export default memo(SideBarCategoryList);
