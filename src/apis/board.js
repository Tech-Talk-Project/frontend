import { instance } from "./axios";

const ENDPOINT = "/user/board";

export const createPost = ({ title, content, tags, category }) =>
  instance
    .post(`${ENDPOINT}/create`, { title, content, tags, category })
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
