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

export const getUserData = ({ selectedMemberId, memberId }) =>
  instance
    .get("/member", {
      params: { memberId, selectedMemberId },
    })
    .then((response) => response.data);

export const getFollowingUsersData = ({ cursor }) =>
  instance
    .get("/user/follow/followings", {
      params: { cursor },
    })
    .then((response) => response.data);
