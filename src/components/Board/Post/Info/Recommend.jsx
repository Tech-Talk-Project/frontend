import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { Chip } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import Button from "../../../Common/Button";
import { toggleLike } from "../../../../apis/board";
import useToast from "../../../../hooks/useToast";

export default function Recommend({ postId, category, likeCount, isLiked }) {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const { showToast } = useToast();
  const toggleLikeMutate = useMutation({
    mutationFn: () => toggleLike({ postId, category }),
    onSuccess: () => {
      setIsLikedState((prev) => !prev);
      setLikeCountState((prev) => (isLikedState ? prev - 1 : prev + 1));
    },
    onError: () => {
      showToast("잠시후 다시 시도해주세요.");
    },
  });

  const handleClick = () => {
    toggleLikeMutate.mutate({ postId, category });
  };

  useEffect(() => {
    setIsLikedState(isLiked);
  }, [isLiked]);

  useEffect(() => {
    setLikeCountState(likeCount);
  }, [likeCount]);
  return (
    <article className="flex justify-center items-center gap-2">
      <Button
        variant="text"
        className={`p-1 text-blue-gray-500 hover:text-brand ${
          isLikedState ? "text-brand" : ""
        }`}
        onClick={handleClick}
      >
        <MdFavorite size={40} />
      </Button>
      <Chip
        value={likeCountState}
        size="lg"
        className="p-0 bg-transparent text-2xl"
      />
    </article>
  );
}
