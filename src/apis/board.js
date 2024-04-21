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

export const createCommnet = ({ boardId, content, category }) =>
  instance
    .post(`${ENDPOINT}/add-comment`, {
      boardId,
      content,
      category,
    })
    .then((response) => response.data);
