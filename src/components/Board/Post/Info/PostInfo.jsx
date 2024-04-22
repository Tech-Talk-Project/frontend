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
    <aside className="md:sticky md:top-20 flex flex-col gap-4 p-4 w-full md:w-80 md:h-[calc(100vh-5rem)] md:border-l border-blue-gray-800 overflow-y-auto shrink-0">
      <Tags tags={tags} />
      <div className="flex md:flex-col gap-4 justify-evenly">
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
        <Author imageUrl={imageUrl} name={name} />
      </div>
    </aside>
  );
}

function getIsProjectOrStudy(type) {
  let result = false;
  if (type === "project" || type === "study") result = true;

  return result;
}
