import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CHAT_QUERY_KEYS } from "../../../constants/queryKeys";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import { getChattingWithCursor } from "../../../apis/chat";
import { Spinner } from "@material-tailwind/react";
import ChattingItem from "./ChattingItem";
import { queryClient } from "../../../apis/queryClient";

export default function ChattingList({
  memberId,
  chatRoomId,
  firstChatData,
  members,
  chatList,
  setChatList,
  unreadCount,
}) {
  const observerRef = useRef(null);
  const chatListContainerRef = useRef(null);
  const chatListRef = useRef([]);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);
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
  const [observe, unobserve] = useIntersectionObserver(() => {
    if (isFetchingNextPage) return;

    fetchNextPage();
    const scrollHeight = chatListContainerRef.current?.scrollHeight;
    setPrevScrollHeight(scrollHeight);
  });

  // 채팅 추가될 때 스크롤
  useLayoutEffect(() => {
    if (
      chatList.length === 0 ||
      chatList.length === firstChatData.length ||
      prevScrollHeight
    )
      return;

    const { scrollTop, scrollHeight, clientHeight } =
      chatListContainerRef.current;
    if (
      chatList[chatList.length - 1].senderId === memberId ||
      scrollHeight - scrollTop - clientHeight < 500
    ) {
      chatListRef.current[chatList.length - 1]?.scrollIntoView({
        block: "end",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatList, firstChatData, memberId]);

  // 첫 렌더링 시 읽지 않은 채팅이 가운데 보이게 스크롤
  // 읽지 않은 채팅이 없으면 가장 아래로 스크롤
  useLayoutEffect(() => {
    if (
      chatList.length === 0 ||
      firstChatData.length !== chatList.length ||
      !hasNextPage
    )
      return;

    chatListRef.current[chatList.length - 1 - unreadCount]?.scrollIntoView({
      block: "center",
    });
  }, [chatList, unreadCount, firstChatData, hasNextPage]);

  // 추가 데이터가 가져올 때 스크롤 위치 고정
  useLayoutEffect(() => {
    if (!prevScrollHeight) return;

    const scrollHeight = chatListContainerRef.current.scrollHeight;
    if (scrollHeight - prevScrollHeight === 32) {
      return () => setPrevScrollHeight(0);
    }

    chatListContainerRef.current.scrollTo({
      top: scrollHeight - prevScrollHeight,
    });
    return () => setPrevScrollHeight(0);
  }, [chatList, prevScrollHeight]);

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

  useEffect(() => {
    queryClient.removeQueries(CHAT_QUERY_KEYS.chatDataWithCursor(chatRoomId));
  }, [chatRoomId]);

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <ul
      ref={chatListContainerRef}
      className="flex flex-col gap-2 grow overflow-y-auto"
    >
      <div ref={observerRef} className="flex justify-center items-center">
        {isFetchingNextPage && <Spinner className="h-8 w-8 text-brand" />}
      </div>
      {chatList.map((chat, index) => {
        const { name, imageUrl } = findMember(members, chat.senderId);
        return (
          <ChattingItem
            key={uuidv4()}
            chatListRef={chatListRef}
            chat={chat}
            index={index}
            name={name}
            imageUrl={imageUrl}
          />
        );
      })}
    </ul>
  );
}

function findMember(members, senderId) {
  const memberIndex = members.findIndex(
    (member) => member.memberId === senderId
  );

  return {
    imageUrl: members[memberIndex]?.imageUrl || "",
    name: members[memberIndex]?.name || "",
  };
}

// function getChatData(data) {
//   return data.pages?.reduce((prev, cur) => [...cur.messages, ...prev], []);
// }
