import { instance } from "./axios";

const ENDPOINT = "/user";

export const getProfile = () =>
  instance.get(`${ENDPOINT}/profile`).then((response) => response.data);

export const setProfileInfo = ({ name, job }) =>
  instance
    .post(`${ENDPOINT}/profile/update/info`, { name, job })
    .then((response) => response.data);
