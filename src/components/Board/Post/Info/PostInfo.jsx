import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import Author from "./Author";
import Like from "./Like";
import Tags from "./Tags";
import Recommend from "./Recommend";
import { BOARD_QUERY_KEYS } from "../../../../constants/queryKeys";
import { checkLike } from "../../../../apis/board";

export default function PostInfo({
  postId,
  author: { imageUrl, name },
  likeCount,
  dislikeCount,
  tags,
}) {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const isProjectOrStudy = getIsProjectOrStudy(type);
  const {
    data: { liked },
  } = useSuspenseQuery({
    queryKey: BOARD_QUERY_KEYS.checkLike(postId),
    queryFn: () => checkLike({ postId, category: type.toUpperCase() }),
  });

  return (
    <aside className="sticky top-20 flex flex-col gap-4 p-4 w-80 h-[calc(100vh-5rem)] border-l border-blue-gray-800 overflow-y-auto shrink-0">
      <Author imageUrl={imageUrl} name={name} />
      {isProjectOrStudy ? (
        <Recommend
          postId={postId}
          category={type.toUpperCase()}
          likeCount={likeCount}
          liked={liked}
        />
      ) : (
        <Like
          postId={postId}
          category={type.toUpperCase()}
          likeCount={likeCount}
          dislikeCount={dislikeCount}
          liked={liked}
        />
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
