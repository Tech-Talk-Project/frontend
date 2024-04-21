import React from "react";
import { useSearchParams } from "react-router-dom";
import Author from "./Author";
import Like from "./Like";
import Tags from "./Tags";
import Recommend from "./Recommend";

export default function PostInfo({
  author: { imageUrl, name },
  likeCount,
  dislikeCount,
  tags,
}) {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const isProjectOrStudy = getIsProjectOrStudy(type);

  return (
    <aside className="sticky top-20 flex flex-col gap-4 p-4 w-80 h-[calc(100vh-5rem)] border-l border-blue-gray-800 overflow-y-auto shrink-0">
      <Author imageUrl={imageUrl} name={name} />
      {isProjectOrStudy ? (
        <Recommend likeCount={likeCount} />
      ) : (
        <Like likeCount={likeCount} dislikeCount={dislikeCount} />
      )}
      <Tags tags={tags} />
    </aside>
  );
}

function getIsProjectOrStudy(type) {
  let result = false;
  if (type === "project" || type === "study") result = true;

  return result;
}
