import React from "react";
import { MdFavorite } from "react-icons/md";
import { Chip } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import Button from "../../../Common/Button";
import { toggleLike } from "../../../../apis/board";
import { queryClient } from "../../../../apis/queryClient";
import { BOARD_QUERY_KEYS } from "../../../../constants/queryKeys";

export default function Recommend({ postId, category, likeCount, liked }) {
  const toggleLikeMutate = useMutation({
    mutationFn: () => toggleLike({ postId, category }),
    onSuccess: () => {
      queryClient.invalidateQueries(BOARD_QUERY_KEYS.post(postId));
    },
  });

  const handleClick = () => {
    toggleLikeMutate.mutate({ postId, category });
  };
  return (
    <article className="flex justify-center items-center gap-2">
      <Button
        variant="text"
        className={`p-1 text-blue-gray-500 hover:text-brand ${
          liked ? "text-brand" : ""
        }`}
        onClick={handleClick}
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
