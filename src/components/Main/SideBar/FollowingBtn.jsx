import React, { memo } from "react";
import { ListItem } from "@material-tailwind/react";
import { sideBarMenuStyle } from "../../../utils/sideBarMenuStyle";

const FollowingBtn = ({ filter, onFollowClick }) => {
  return (
    <div className="pt-2 border-t border-blue-gray-100">
      <ListItem
        ripple={false}
        className={sideBarMenuStyle(filter.length === 0)}
        onClick={onFollowClick}
      >
        FOLLOWING
      </ListItem>
    </div>
  );
};

export default memo(FollowingBtn);
