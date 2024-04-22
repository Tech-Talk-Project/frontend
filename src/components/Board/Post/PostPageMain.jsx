import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { BOARD_QUERY_KEYS } from "../../../constants/queryKeys";
import { useParams, useSearchParams } from "react-router-dom";
import { getPost } from "../../../apis/board";
import PostInfo from "./Info/PostInfo";
import PostContent from "./Content/PostContent";

export default function PostPageMain() {
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const {
    data: {
      author,
      likeCount,
      dislikeCount,
      tags,
      recruitmentActive,
      title,
      createdAt,
      updatedAt,
      viewCount,
      content,
      comments,
    },
  } = useSuspenseQuery({
    queryKey: BOARD_QUERY_KEYS.post(postId),
    queryFn: () =>
      getPost({ category: searchParams.get("type").toUpperCase(), postId }),
  });

  return (
    <section className="flex flex-col md:flex-row w-full h-full">
      <PostContent
        recruitmentActive={recruitmentActive}
        title={title}
        createdAt={createdAt}
        updatedAt={updatedAt}
        viewCount={viewCount}
        content={content}
        comments={comments}
      />
      <PostInfo
        postId={postId}
        author={author}
        likeCount={likeCount}
        dislikeCount={dislikeCount}
        tags={tags}
      />
    </section>
  );
}
