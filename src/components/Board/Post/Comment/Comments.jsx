import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Comment from "./Comment";
import useModal from "../../../../hooks/useModal";
import { deleteComment } from "../../../../apis/board";
import { queryClient } from "../../../../apis/queryClient";
import { BOARD_QUERY_KEYS } from "../../../../constants/queryKeys";
import DeleteConfirmModal from "./DeleteConfirmModal";

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
      <DeleteConfirmModal
        isOpen={isDeleteConfirmOpen}
        setIsOpen={setIsDeleteConfirmOpen}
        onDeleteClick={handleDeleteClick}
      />
    </article>
  );
}
