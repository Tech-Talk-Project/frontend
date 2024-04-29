import { instance } from "./axios";

const ENDPOINT = "/user/board";

export const createPost = ({ title, content, tags, category }) =>
  instance
    .post(`${ENDPOINT}/create`, { title, content, tags, category })
    .then((response) => response.data);

export const updatePost = ({ postId, title, content, tags, category }) =>
  instance
    .post(`${ENDPOINT}/update`, {
      boardId: postId,
      title,
      content,
      tags,
      category,
    })
    .then((response) => response.data);

export const deletePost = ({ postId, category }) =>
  instance
    .post(`${ENDPOINT}/delete`, {
      boardId: postId,
      category,
    })
    .then((response) => response.data);

export const getBoardData = ({ page, category, size = 20 }) =>
  instance
    .get("/boards", {
      params: {
        page,
        category,
        size,
      },
    })
    .then((response) => response.data);

export const getPost = ({ category, postId }) =>
  instance
    .get("/board", {
      params: {
        category,
        boardId: postId,
      },
    })
    .then((response) => response.data);

export const updateViewCount = ({ category, postId }) =>
  instance
    .post("/board/view", {
      category,
      boardId: postId,
    })
    .then((response) => response.data);

export const createCommnet = ({ boardId, content, category }) =>
  instance
    .post(`${ENDPOINT}/add-comment`, {
      boardId,
      content,
      category,
    })
    .then((response) => response.data);

export const updateComment = ({ commentId, content }) =>
  instance
    .post("/user/comment/update", {
      commentId,
      content,
    })
    .then((response) => response.data);

export const deleteComment = ({ commentId }) =>
  instance
    .post("/user/comment/delete", {
      commentId,
    })
    .then((response) => response.data);

export const changeRecruitment = ({ postId, category }) =>
  instance
    .post(`${ENDPOINT}/toggle-recruitment`, {
      boardId: postId,
      category,
    })
    .then((response) => response.data);

export const checkLike = ({ postId, category }) =>
  instance
    .get(`${ENDPOINT}/check-like`, {
      params: { boardId: postId, category },
    })
    .then((response) => response.data);

export const checkDisLike = ({ postId, category }) =>
  instance
    .get(`${ENDPOINT}/check-dislike`, {
      params: { boardId: postId, category },
    })
    .then((response) => response.data);

export const toggleLike = ({ postId, category }) =>
  instance
    .post(`${ENDPOINT}/toggle-like`, {
      boardId: postId,
      category,
    })
    .then((response) => response.data);

export const toggleDisLike = ({ postId, category }) =>
  instance
    .post(`${ENDPOINT}/toggle-dislike`, {
      boardId: postId,
      category,
    })
    .then((response) => response.data);
