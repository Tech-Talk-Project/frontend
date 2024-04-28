import React from "react";
import { Typography } from "@material-tailwind/react";
import Button from "../../Common/Button";

export default function NullBoard({ onCreateClick }) {
  return (
    <article className="flex flex-col gap-8 justify-center items-center h-full">
      <Typography variant="h5" className="text-blue-gray-600">
        게시판이 비어있습니다. 게시글을 생성해보세요!
      </Typography>
      <Button onClick={onCreateClick} className="bg-brand text-sm py-2 px-6">
        글쓰기
      </Button>
    </article>
  );
}
