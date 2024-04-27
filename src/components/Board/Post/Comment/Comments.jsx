import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Comment from "./Comment";
import useModal from "../../../../hooks/useModal";
import Button from "../../../Common/Button";
import { deleteComment } from "../../../../apis/board";
import { queryClient } from "../../../../apis/queryClient";
import { BOARD_QUERY_KEYS } from "../../../../constants/queryKeys";

export default function Comments({ comments }) {
  const { postId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useModal();
  const commentDeleteMutate = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      setIsDeleteConfirmOpen((prev) => !prev);
      setSearchParams({ type: searchParams.get("type") });
      queryClient.invalidateQueries(BOARD_QUERY_KEYS.post(postId));
    },
  });

  const handleModalClick = () => {
    setIsDeleteConfirmOpen((prev) => !prev);
  };
  const handleDeleteClick = () => {
    commentDeleteMutate.mutate({ commentId: searchParams.get("comment_id") });
  };
  return (
    <article className="mt-6 border-t border-blue-gray-800">
      <ul
        className={`flex flex-col ${comments.length === 0 ? "" : "py-4"} gap-2`}
      >
        {comments.map((comment) => (
          <Comment
            key={uuidv4()}
            comment={comment}
            onModalClick={handleModalClick}
          />
        ))}
      </ul>
      <Dialog open={isDeleteConfirmOpen} handler={handleModalClick}>
        <DialogBody className="flex flex-col items-center gap-1 text-center px-6 py-8">
          <Typography variant="h5" color="black">
            정말 댓글을 삭제하시겠습니까?
          </Typography>
          <Typography>
            확인 버튼 클릭 시, 댓글은 삭제되며 복구할 수 없습니다.
          </Typography>
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button variant="text" onClick={handleModalClick}>
            취소
          </Button>
          <Button className="bg-brand" onClick={handleDeleteClick}>
            확인
          </Button>
        </DialogFooter>
      </Dialog>
    </article>
  );
}
