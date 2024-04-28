import React, { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { USERS_QUERY_KEYS } from "../../constants/queryKeys";
import { getFollowingUsersData } from "../../apis/user";
import UsersGrid from "./User/UsersGrid";
import Pagination from "./Common/Pagination";
import NullUserGrid from "./NullUserGrid";
import usePagination from "../../hooks/usePagination";

export default function FollowingPage() {
  const [page, setPage] = useState(1);
  const {
    data: { data: userData, totalPage },
  } = useSuspenseQuery({
    queryKey: USERS_QUERY_KEYS.followingUsers(page),
    queryFn: () => getFollowingUsersData({ pageNumber: page }),
    keepPreviousData: true,
  });
  const {
    pageStart,
    getItemProps,
    handleNextClick,
    handleFirstPageClick,
    handleLastPageClick,
    handlePrevClick,
  } = usePagination({ page, setPage, totalPage });
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
