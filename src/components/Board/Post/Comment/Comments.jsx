import React from "react";
import { v4 as uuidv4 } from "uuid";
import Comment from "./Comment";

export default function Comments({ comments }) {
  return (
    <article className="border-t border-blue-gray-800">
      <ul className="flex flex-col py-4 gap-2">
        {comments.map((comment) => (
          <Comment key={uuidv4()} comment={comment} />
        ))}
      </ul>
    </article>
  );
}
