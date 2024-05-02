import React from "react";
import { useRecoilValue } from "recoil";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { BOARD_QUERY_KEYS } from "../../../constants/queryKeys";
import { getPost } from "../../../apis/board";
import PostCreatePageMain from "../PostCreate/PostCreatePageMain";
import { memberIdState } from "../../../recoil/atoms/auth";

export default function PostUpdatePageMain() {
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const memberId = useRecoilValue(memberIdState);
  const {
    data: {
      tags,
      title,
      content,
      author: { memberId: authorId },
    },
  } = useSuspenseQuery({
    queryKey: BOARD_QUERY_KEYS.post(postId),
    queryFn: () =>
      getPost({ category: searchParams.get("type").toUpperCase(), postId }),
  });

  if (authorId !== memberId) {
    return <Navigate to="/" replace />;
  }
  return (
    <PostCreatePageMain
      postTitle={title}
      postContent={content}
      postTags={tags}
    />
  );
}
