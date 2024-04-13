import { instance } from "./axios";

const ENDPOINT = "/user";

export const quit = () =>
  instance.get(`${ENDPOINT}/removeMember`).then((response) => response.data);

export const getUsersDataWithLogin = ({ cursor, limit = 15, skills = [] }) =>
  instance
    .post(`${ENDPOINT}/members`, {
      cursor,
      limit,
      skills,
    })
    .then((response) => response.data);

export const getUsersData = ({ cursor, limit = 15, skills = [] }) =>
  instance
    .post("/members", {
      cursor,
      limit,
      skills,
    })
    .then((response) => response.data);

export const getUserData = ({ selectedMemberId }) =>
  instance
    .get("/member", {
      params: { selectedMemberId },
    })
    .then((response) => response.data);

export const getUserDataWithLogin = ({ selectedMemberId }) =>
  instance
    .get(`${ENDPOINT}/member`, {
      params: { selectedMemberId },
    })
    .then((response) => response.data);

export const getFollowingUsersData = ({ pageNumber, pageSize = 30 }) =>
  instance
    .get(`${ENDPOINT}/follow/followings`, {
      params: { pageNumber, pageSize },
    })
    .then((response) => response.data);

export const follow = ({ selectedMemberId }) =>
  instance
    .post(`${ENDPOINT}/follow/add`, {
      memberId: selectedMemberId,
    })
    .then((response) => response.data);

export const unFollow = ({ selectedMemberId }) =>
  instance
    .post(`${ENDPOINT}/follow/remove`, {
      memberId: selectedMemberId,
    })
    .then((response) => response.data);

export const searchWithEmail = ({ email, limit = 10 }) =>
  instance
    .get("/members/search", {
      params: { email, limit },
    })
    .then((response) => response.data);
