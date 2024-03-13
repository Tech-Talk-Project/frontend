import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CHAT_QUERY_KEYS } from "../../../constants/queryKeys";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import { getChattingWithCursor } from "../../../apis/chat";
import { Spinner } from "@material-tailwind/react";

export default function ChattingList({ chatRoomId, chatList, setChatList }) {
  const observerRef = useRef(null);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, error } =
    useInfiniteQuery({
      queryKey: CHAT_QUERY_KEYS.chatDataWithCursor(chatRoomId),
      queryFn: ({ pageParam }) =>
        getChattingWithCursor({
          chatRoomId,
          cursor: pageParam,
        }),
      initialPageParam: new Date().toISOString(),
      getNextPageParam: (lastPage) =>
        lastPage.messages.length > 0 ? lastPage.messages[0].sendTime : null,
    });
  const [observe, unobserve] = useIntersectionObserver(fetchNextPage);

  useEffect(() => {
    const lastIndex = data.pages.length - 1;
    if (data.pageParams.length === 1 || !hasNextPage) return;

    setChatList((prev) => [...data.pages[lastIndex].messages, ...prev]);
  }, [data, setChatList, hasNextPage]);

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
    <ul className="grow overflow-y-auto">
      <div ref={observerRef} className="flex justify-center items-center">
        {isFetchingNextPage && <Spinner className="h-8 w-8 text-brand" />}
      </div>
      {chatList.map((chat) => (
        <li key={uuidv4()}>
          <span>{chat.content}</span>
          <span className="ml-20">{chat.senderId}</span>
        </li>
      ))}
    </ul>
  );
}
