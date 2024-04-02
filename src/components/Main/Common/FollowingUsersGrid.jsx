import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { USERS_QUERY_KEYS } from "../../../constants/queryKeys";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import { Spinner } from "@material-tailwind/react";
import { getFollowingUsersData } from "../../../apis/user";
import UsersGrid from "../User/UsersGrid";

export default function FollowingUsersGrid() {
  const observerRef = useRef(null);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, error } =
    useInfiniteQuery({
      queryKey: USERS_QUERY_KEYS.followingUsers,
      queryFn: ({ pageParam = null }) =>
        getFollowingUsersData({
          cursor: pageParam,
        }),
      getNextPageParam: (lastPage) => lastPage.nextCursor || null,
    });
  const [observe, unobserve] = useIntersectionObserver(fetchNextPage);

  useEffect(() => {
    if (!hasNextPage || !observerRef) return;
    const observer = observerRef.current;
    observe(observer);

    return () => unobserve(observer);
  }, [observerRef, hasNextPage, observe, unobserve]);

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <section>
        <UsersGrid users={data.pages} />
      </section>
      <div ref={observerRef} className="flex justify-center items-center">
        {isFetchingNextPage && <Spinner className="h-8 w-8 text-brand" />}
      </div>
    </>
  );
}
