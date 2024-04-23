import React from "react";
import { v4 as uuidv4 } from "uuid";
import Comment from "./Comment";

export default function Comments({ comments }) {
  return (
    <article className="mt-6 border-t border-blue-gray-800">
      <ul
        className={`flex flex-col ${comments.length === 0 ? "" : "py-4"} gap-2`}
      >
        {comments.map((comment) => (
          <Comment key={uuidv4()} comment={comment} />
        ))}
      </ul>
    </article>
  );
}
