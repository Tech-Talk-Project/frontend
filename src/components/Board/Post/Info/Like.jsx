import React from "react";
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import { Chip } from "@material-tailwind/react";
import Button from "../../../Common/Button";

export default function Like({ likeCount, dislikeCount }) {
  return (
    <article className="flex justify-center gap-8 my-4">
      <Button
        variant="text"
        className="p-1 text-blue-gray-500 hover:text-brand"
      >
        <MdThumbDown size={48} />
      </Button>
      <Chip
        value={likeCount - dislikeCount}
        size="lg"
        className="p-0 bg-transparent text-2xl"
      />
      <Button
        variant="text"
        className="p-1 text-blue-gray-500 hover:text-brand"
      >
        <MdThumbUp size={48} />
      </Button>
    </article>
  );
}
