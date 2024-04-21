import { instance } from "./axios";

const ENDPOINT = "/user/board";

export const createPost = ({ title, content, tags, category }) =>
  instance
    .post(`${ENDPOINT}/create`, { title, content, tags, category })
    .then((response) => response.data);
