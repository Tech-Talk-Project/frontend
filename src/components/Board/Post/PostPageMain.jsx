import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { BOARD_QUERY_KEYS } from "../../../constants/queryKeys";
import { useParams, useSearchParams } from "react-router-dom";
import { getPost } from "../../../apis/board";
import PostInfo from "./PostInfo";

export default function PostPageMain() {
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const {
    data: { author, likeCount, dislikeCount, recruitmentActive, tags },
  } = useSuspenseQuery({
    queryKey: BOARD_QUERY_KEYS.post(postId),
    queryFn: () =>
      getPost({ category: searchParams.get("type").toUpperCase(), postId }),
  });

  return (
    <section className="flex w-full">
      <section className="flex grow"></section>
      <PostInfo
        author={author}
        likeCount={likeCount}
        dislikeCount={dislikeCount}
        recruitmentActive={recruitmentActive}
        tags={tags}
      />
    </section>
  );
}
