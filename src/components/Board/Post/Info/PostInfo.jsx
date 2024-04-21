import React from "react";
import Author from "./Author";
import Like from "./Like";
import Tags from "./Tags";

export default function PostInfo({
  author: { imageUrl, name },
  likeCount,
  dislikeCount,
  tags,
}) {
  return (
    <aside className="sticky top-20 flex flex-col gap-4 p-4 w-80 h-[calc(100vh-5rem)] border-l border-blue-gray-800 overflow-y-auto shrink-0">
      <Author imageUrl={imageUrl} name={name} />
      <Like likeCount={likeCount} dislikeCount={dislikeCount} />
      <Tags tags={tags} />
    </aside>
  );
}
