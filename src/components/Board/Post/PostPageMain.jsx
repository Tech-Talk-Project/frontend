import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { BOARD_QUERY_KEYS } from "../../../constants/queryKeys";
import { useParams, useSearchParams } from "react-router-dom";
import { getPost } from "../../../apis/board";

export default function PostPageMain() {
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const { data } = useSuspenseQuery({
    queryKey: BOARD_QUERY_KEYS.post(postId),
    queryFn: () =>
      getPost({ category: searchParams.get("type").toUpperCase(), postId }),
  });
  console.log(data);
  return (
    <section className="w-full">
      <aside></aside>
    </section>
  );
}
