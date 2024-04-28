import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { BOARD_QUERY_KEYS } from "../../../constants/queryKeys";
import { getPost } from "../../../apis/board";
import PostCreatePageMain from "../PostCreate/PostCreatePageMain";

export default function PostUpdatePageMain() {
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const {
    data: { tags, title, content },
  } = useSuspenseQuery({
    queryKey: BOARD_QUERY_KEYS.post(postId),
    queryFn: () =>
      getPost({ category: searchParams.get("type").toUpperCase(), postId }),
  });
  return (
    <PostCreatePageMain
      postTitle={title}
      postContent={content}
      postTags={tags}
    />
  );
}
