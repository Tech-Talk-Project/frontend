import React from "react";
import PostContentInfo from "./PostContentInfo";
import Content from "../Common/Content";
import Comments from "../Comment/Comments";
import CreateComment from "./CreateComment";

export default function PostContent({
  author,
  recruitmentActive,
  title,
  createdAt,
  updatedAt,
  viewCount,
  content,
  comments,
}) {
  return (
    <section className="flex flex-col grow p-4 md:p-8">
      <PostContentInfo
        author={author}
        title={title}
        updatedAt={updatedAt}
        createdAt={createdAt}
        recruitmentActive={recruitmentActive}
        viewCount={viewCount}
      />
      <Content content={content} />
      <CreateComment />
      <Comments comments={comments} />
    </section>
  );
}
