import React from "react";
import Button from "../../../Common/Button";
import { MdFavorite } from "react-icons/md";
import { Chip } from "@material-tailwind/react";

export default function Recommend({ likeCount }) {
  return (
    <article className="flex justify-center items-center gap-2">
      <Button
        variant="text"
        className="p-1 text-blue-gray-500 hover:text-brand"
      >
        <MdFavorite size={40} />
      </Button>
      <Chip
        value={likeCount}
        size="lg"
        className="p-0 bg-transparent text-2xl"
      />
    </article>
  );
}
