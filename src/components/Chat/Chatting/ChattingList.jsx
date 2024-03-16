import React, { useEffect, useLayoutEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CHAT_QUERY_KEYS } from "../../../constants/queryKeys";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import { getChattingWithCursor } from "../../../apis/chat";
import { Spinner } from "@material-tailwind/react";
import ChattingItem from "./ChattingItem";

export default function ChattingList({
  chatRoomId,
  firstChatData,
  chatList,
  setChatList,
  unreadCount,
}) {
  const observerRef = useRef(null);
  const chatListContainerRef = useRef(null);
  const chatListRef = useRef([]);
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

  useLayoutEffect(() => {
    if (chatList.length === 0 || firstChatData.length !== chatList.length)
      return;

    chatListRef.current[chatList.length - 1 - unreadCount]?.scrollIntoView({
      block: "center",
    });
  }, [chatList, unreadCount, firstChatData]);

  useEffect(() => {
    const dataLength = data.pages.length;
    if (dataLength === 1) return;

    setChatList((prev) => [...data.pages[dataLength - 1].messages, ...prev]);
  }, [data, setChatList]);

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
    <ul ref={chatListContainerRef} className="grow overflow-y-auto">
      <div ref={observerRef} className="flex justify-center items-center">
        {isFetchingNextPage && <Spinner className="h-8 w-8 text-brand" />}
      </div>
      {chatList.map((chat, index) => (
        <ChattingItem
          key={uuidv4()}
          chatListRef={chatListRef}
          chat={chat}
          index={index}
        />
      ))}
    </ul>
  );
}
