import { instance } from "./axios";

export const quit = () =>
  instance.get("/user/removeMember").then((response) => response.data);

export const getUsersData = ({ cursor, limit = 15, skills = [] }) =>
  instance
    .post("/members", {
      cursor,
      limit,
      skills,
    })
    .then((response) => response.data);
