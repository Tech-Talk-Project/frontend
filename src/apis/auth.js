import { instance } from "./axios";

const ENDPOINT = "/auth";

export const login = ({ code, provider }) =>
  instance
    .post(`${ENDPOINT}/login`, {
      code,
      provider: provider.toUpperCase(),
    })
    .then((response) => response.data);

export const refresh = () =>
  instance.get(`${ENDPOINT}/refresh`).then((response) => response.data);
