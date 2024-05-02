import React, { useEffect, useState } from "react";
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { Chip } from "@material-tailwind/react";
import Button from "../../../Common/Button";
import { toggleDisLike, toggleLike } from "../../../../apis/board";
import useToast from "../../../../hooks/useToast";

export default function Like({
  postId,
  category,
  likeCount,
  dislikeCount,
  isLiked,
  isDisLiked,
}) {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [isDisLikedState, setIsDisLikedState] = useState(isDisLiked);
  const [likeCountState, setLikeCountState] = useState(
    likeCount - dislikeCount
  );
  const { showToast } = useToast();
  const toggleLikeMutate = useMutation({
    mutationFn: () => toggleLike({ postId, category }),
    onSuccess: () => {
      if (isDisLikedState) {
        setIsDisLikedState((prev) => !prev);
      }
      setIsLikedState((prev) => !prev);
      setLikeCountState((prev) =>
        isDisLikedState ? prev + 2 : isLikedState ? prev - 1 : prev + 1
      );
    },
    onError: (error) => {
      const status = error.response.status;
      if (status === 400) {
        showToast("로그인 후 사용할 수 있는 기능입니다.");
        return;
      }

      showToast("잠시후 다시 시도해주세요.");
    },
  });
  const toggleDisLikeMutate = useMutation({
    mutationFn: () => toggleDisLike({ postId, category }),
    onSuccess: () => {
      if (isLikedState) {
        setIsLikedState((prev) => !prev);
      }
      setIsDisLikedState((prev) => !prev);
      setLikeCountState((prev) =>
        isLikedState ? prev - 2 : isDisLikedState ? prev + 1 : prev - 1
      );
    },
    onError: (error) => {
      const status = error.response.status;
      if (status === 400) {
        showToast("로그인 후 사용할 수 있는 기능입니다.");
        return;
      }

      showToast("잠시후 다시 시도해주세요.");
    },
  });

  const handleDisLikeClick = () => {
    toggleDisLikeMutate.mutate({ postId, category });
  };
  const handleLikeClick = () => {
    toggleLikeMutate.mutate({ postId, category });
  };

  useEffect(() => {
    setIsLikedState(isLiked);
    setIsDisLikedState(isDisLiked);
  }, [isLiked, isDisLiked]);

  useEffect(() => {
    setLikeCountState(likeCount - dislikeCount);
  }, [likeCount, dislikeCount]);
  return (
    <article className="flex justify-center gap-8 my-4">
      <Button
        variant="text"
        className={`p-1 text-blue-gray-500 hover:text-brand ${
          isDisLikedState ? "text-brand" : ""
        }`}
        onClick={handleDisLikeClick}
      >
        <MdThumbDown size={40} />
      </Button>
      <Chip
        value={likeCountState}
        size="lg"
        className="p-0 bg-transparent text-2xl"
      />
      <Button
        variant="text"
        className={`p-1 text-blue-gray-500 hover:text-brand ${
          isLikedState ? "text-brand" : ""
        }`}
        onClick={handleLikeClick}
      >
        <MdThumbUp size={40} />
      </Button>
    </article>
  );
}
