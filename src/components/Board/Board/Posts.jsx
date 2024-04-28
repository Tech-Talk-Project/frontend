import React from "react";
import { v4 as uuidv4 } from "uuid";
import Post from "./Post";

export default function Posts({ boardList }) {
  return (
    <ul className="flex flex-col gap-2">
      {boardList.map((post) => (
        <Post key={uuidv4()} post={post} />
      ))}
    </ul>
  );
}
