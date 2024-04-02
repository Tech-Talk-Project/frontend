import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";
import UsersGrid from "../User/UsersGrid";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import { getUsersData } from "../../../apis/user";
import { USERS_QUERY_KEYS } from "../../../constants/queryKeys";

const USERS_COUNT = 15;

export default function EveryUsersGrid({ filters }) {
  const observerRef = useRef(null);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, error } =
    useInfiniteQuery({
      queryKey: USERS_QUERY_KEYS.usersData(filters),
      queryFn: ({ pageParam = null }) =>
        getUsersData({
          cursor: pageParam,
          limit: USERS_COUNT,
          skills: filters,
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