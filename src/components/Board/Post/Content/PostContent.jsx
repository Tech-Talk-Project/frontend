import React from "react";
import PostContentInfo from "./PostContentInfo";
import Content from "../Common/Content";
import Comments from "../Comment/Comments";

export default function PostContent({
  recruitmentActive,
  title,
  createdAt,
  updatedAt,
  viewCount,
  content,
  comments,
}) {
  return (
    <section className="flex flex-col grow p-8">
      <PostContentInfo
        title={title}
        updatedAt={updatedAt}
        createdAt={createdAt}
        recruitmentActive={recruitmentActive}
        viewCount={viewCount}
      />
      <Content content={content} />
      <Comments comments={comments} />
    </section>
  );
}
