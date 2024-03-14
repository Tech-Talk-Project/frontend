import React from "react";

export default function ChattingItem({
  chatListRef,
  chat: { content, senderId, sendTime },
  index,
}) {
  return (
    <li
      ref={(element) => {
        chatListRef.current[index] = element;
      }}
    >
      <span>{content}</span>
      <span className="ml-20">{senderId}</span>
    </li>
  );
}
