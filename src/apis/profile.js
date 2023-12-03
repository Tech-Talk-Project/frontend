import { instance } from "./axios";

const ENDPOINT = "/user";

export const getProfile = () =>
  instance.get(`${ENDPOINT}/profile`).then((response) => response.data);
