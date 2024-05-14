import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";
import { HiOutlineArrowCircleDown } from "@react-icons/all-files/hi/HiOutlineArrowCircleDown";
import { CHAT_QUERY_KEYS } from "../../../constants/queryKeys";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import { getChattingWithCursor } from "../../../apis/chat";
import ChattingItem from "./ChattingItem";
import Button from "../../Common/Button";

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
  const [showButton, setShowButton] = useState(false);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, error } =
    useSuspenseInfiniteQuery({
      queryKey: CHAT_QUERY_KEYS.chatDataWithCursor(chatRoomId),
      queryFn: ({ pageParam }) =>
        getChattingWithCursor({
          chatRoomId,
          cursor: pageParam,
        }),
      initialPageParam: null,
      getNextPageParam: (lastPage, allPages) => {
        const lastSendTime = new Date(firstChatData[0].sendTime);
        const nextCursor = new Date(lastPage.nextCursor);

        return lastSendTime > nextCursor
          ? lastPage.nextCursor
          : firstChatData[0].sendTime;
      },
      refetchOnWindowFocus: false,
    });
  const [observe, unobserve] = useIntersectionObserver(() => {
    if (isFetchingNextPage) return;

    fetchNextPage();
    const scrollHeight = chatListContainerRef.current?.scrollHeight;
    setPrevScrollHeight(scrollHeight);
  });
  const handleScrollClick = () => {
    if (chatListRef.current) {
      const chatListRefWithoutNull = chatListRef.current.filter(
        (chatRef) => chatRef !== null
      );

      chatListRefWithoutNull[chatListRefWithoutNull.length - 1].scrollIntoView({
        behavior: "smooth",
      });
    }
  };

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
      scrollHeight - scrollTop - clientHeight < 100
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
    if (chatList.length === 0 || firstChatData.length !== chatList.length)
      return;

    chatListRef.current[chatList.length - 1 - unreadCount]?.scrollIntoView({
      block: "center",
    });
  }, [chatList, unreadCount, firstChatData]);

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
    if (dataLength === 1 && !hasNextPage) return;

    setChatList((prev) => [...data.pages[dataLength - 1].messages, ...prev]);
  }, [data, setChatList, hasNextPage]);

  useEffect(() => {
    const chatListContainer = chatListContainerRef.current;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatListContainer;
      if (scrollHeight - scrollTop - clientHeight >= 50) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    if (chatListContainer) {
      chatListContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatListContainer)
        chatListContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <ul
      ref={chatListContainerRef}
      className="relative flex flex-col gap-2 grow overflow-y-auto"
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
      {showButton && (
        <Button
          variant="text"
          className="sticky bottom-2 left-0 right-0 flex justify-center items-center mx-auto p-1 text-white hover:text-brand bg-blue-gray-600 rounded-full duration-150 z-30 opacity-70"
          onClick={handleScrollClick}
        >
          <HiOutlineArrowCircleDown size={32} />
        </Button>
      )}
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
