import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { BOARD_QUERY_KEYS } from "../constants/queryKeys";
import {
  changeRecruitment,
  createComment,
  createPost,
  deleteComment,
  deletePost,
  toggleDisLike,
  toggleLike,
  updateComment,
  updatePost,
} from "../apis/board";
import { queryClient } from "../apis/queryClient";
import useToast from "./useToast";

export default function useBoard({ postId }) {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const commentDeleteMutate = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(BOARD_QUERY_KEYS.post(postId));
    },
  });

  const updateMutate = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries(BOARD_QUERY_KEYS.post(postId));
    },
  });

  const createCommentMutate = useMutation({
    mutationFn: ({ content, category }) =>
      createComment({ boardId: postId, content, category }),
    onSuccess: () => {
      queryClient.invalidateQueries(BOARD_QUERY_KEYS.post(postId));
    },
  });

  const changeRecruitmentMutate = useMutation({
    mutationFn: ({ category }) => changeRecruitment({ postId, category }),
    onError: () => {
      showToast("잠시후 다시 시도해주세요.");
    },
  });

  const postDeleteMutate = useMutation({
    mutationFn: ({ category }) => deletePost({ postId, category }),
  });

  const toggleLikeMutate = useMutation({
    mutationFn: ({ category }) => toggleLike({ postId, category }),
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
    mutationFn: ({ category }) => toggleDisLike({ postId, category }),
    onError: (error) => {
      const status = error.response.status;
      if (status === 400) {
        showToast("로그인 후 사용할 수 있는 기능입니다.");
        return;
      }

      showToast("잠시후 다시 시도해주세요.");
    },
  });

  const toggleRecommendMutate = useMutation({
    mutationFn: ({ category }) => toggleLike({ postId, category }),
    onError: (error) => {
      const status = error.response.status;
      if (status === 400) {
        showToast("로그인 후 사용할 수 있는 기능입니다.");
        return;
      }

      showToast("잠시후 다시 시도해주세요.");
    },
  });

  const createPostMutate = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      navigate(-1);
    },
  });

  const updatePostMutate = useMutation({
    mutationFn: ({ data }) => updatePost({ postId, ...data }),
    onSuccess: () => {
      navigate(-1);
    },
    onError: () => {
      showToast("본인이 작성한 글만 수정할 수 있습니다.");
    },
  });

  return {
    commentDeleteMutate,
    updateMutate,
    createCommentMutate,
    changeRecruitmentMutate,
    postDeleteMutate,
    toggleLikeMutate,
    toggleDisLikeMutate,
    toggleRecommendMutate,
    createPostMutate,
    updatePostMutate,
  };
}
