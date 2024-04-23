import React, { useState } from "react";
import { MdFavorite } from "react-icons/md";
import { Chip } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import Button from "../../../Common/Button";
import { toggleLike } from "../../../../apis/board";
import { useSetRecoilState } from "recoil";
import { toastState } from "../../../../recoil/atoms/toast";

export default function Recommend({ postId, category, likeCount, liked }) {
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const setToast = useSetRecoilState(toastState);
  const toggleLikeMutate = useMutation({
    mutationFn: () => toggleLike({ postId, category }),
    onSuccess: () => {
      setIsLiked((prev) => !prev);
      setLikeCountState((prev) => (isLiked ? prev - 1 : prev + 1));
    },
    onError: () => {
      setToast({
        isOpen: true,
        message: "잠시후 다시 시도해주세요.",
      });
      setTimeout(() => {
        setToast({ isOpen: false, message: "" });
      }, 3000);
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
          isLiked ? "text-brand" : ""
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
