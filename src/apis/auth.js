import { instance } from "./axios";

export const login = ({ code, provider }) =>
  instance
    .post("/auth/login", {
      code,
      provider: provider.toUpperCase(),
    })
    .then((response) => response.data);
