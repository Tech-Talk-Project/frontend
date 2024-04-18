import React, { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { USERS_QUERY_KEYS } from "../../constants/queryKeys";
import { getFollowingUsersData } from "../../apis/user";
import UsersGrid from "./User/UsersGrid";
import Pagination from "./Common/Pagination";
import NullUserGrid from "./NullUserGrid";

export default function FollowingPage() {
  const [page, setPage] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const {
    data: { data: userData, totalPage },
  } = useSuspenseQuery({
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
      {userData.length === 0 ? (
        <NullUserGrid />
      ) : (
        <>
          <UsersGrid users={userData} isFollowing={true} />
          <Pagination
            pageStart={pageStart}
            page={page}
            totalPage={totalPage}
            onFirstPageClick={handleFirstPageClick}
            onLastPageClick={handleLastPageClick}
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
            getItemProps={getItemProps}
          />
        </>
      )}
    </section>
  );
}
