import { instance } from "./axios";

export const login = async ({ code, provider }) => {
  try {
    const response = await instance.post("/auth/login", {
      code,
      provider: provider.toUpperCase(),
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
