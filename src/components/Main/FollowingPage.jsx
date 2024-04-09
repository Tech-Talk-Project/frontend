import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { USERS_QUERY_KEYS } from "../../constants/queryKeys";
import { getFollowingUsersData } from "../../apis/user";
import UsersGrid from "./User/UsersGrid";
import Button from "../Common/Button";
import { IconButton } from "@material-tailwind/react";

export default function FollowingPage() {
  const [page, setPage] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const {
    data: { data: userData, totalPage },
  } = useQuery({
    queryKey: USERS_QUERY_KEYS.followingUsers(page),
    queryFn: () => getFollowingUsersData({ pageNumber: page }),
    keepPreviousData: true,
  });

  const getItemProps = (value) => ({
    variant: page === value ? "filled" : "text",
    color: "white",
    className: `${page === value ? "bg-brand text-white" : ""}`,
    ripple: false,
    onClick: () => {
      setPage(value);
      if (value < page) {
        if (page % 5 === 1) setPageStart(page - 5);
      } else {
        if (page % 5 === 0) setPageStart(page + 1);
      }
    },
  });
  const handleNextClick = () => {
    if (page === totalPage) return;

    if (page % 5 === 0) setPageStart(page + 1);
    setPage((prev) => prev + 1);
  };
  const handleLastPageClick = () => {
    setPage(totalPage);
    setPageStart(totalPage - ((totalPage % 5) - 1));
  };
  const handlePrevClick = () => {
    if (page === 1) return;

    if (page % 5 === 1) setPageStart(page - 5);
    setPage((prev) => prev - 1);
  };
  const handleFirstPageClick = () => {
    setPage(1);
    setPageStart(1);
  };
  return (
    <section className="flex flex-col justify-between gap-4 h-full">
      <UsersGrid users={userData} isFollowing={true} />
      <div className="flex justify-center items-center gap-4 py-4">
        <Button
          variant="text"
          className="flex items-center gap-2 p-1 text-white hover:text-brand"
          onClick={handleFirstPageClick}
          disabled={page === 1}
        >
          <MdOutlineKeyboardDoubleArrowLeft size={24} />
        </Button>
        <Button
          variant="text"
          className="flex items-center gap-2 p-1 text-white hover:text-brand"
          onClick={handlePrevClick}
          disabled={page === 1}
        >
          <MdOutlineKeyboardArrowLeft size={24} />
        </Button>
        <div className="flex items-center gap-2">
          {Array.from(
            {
              length:
                totalPage - pageStart >= 5 ? 5 : totalPage - pageStart + 1,
            },
            (_, index) => pageStart + index
          ).map((value) => (
            <IconButton key={uuidv4()} {...getItemProps(value)}>
              {value}
            </IconButton>
          ))}
        </div>
        <Button
          variant="text"
          className="flex items-center gap-2 p-1 text-white hover:text-brand"
          onClick={handleNextClick}
          disabled={page === totalPage}
        >
          <MdOutlineKeyboardArrowRight size={24} />
        </Button>
        <Button
          variant="text"
          className="flex items-center gap-2 p-1 text-white hover:text-brand"
          onClick={handleLastPageClick}
          disabled={page === totalPage}
        >
          <MdOutlineKeyboardDoubleArrowRight size={24} />
        </Button>
      </div>
    </section>
  );
}
