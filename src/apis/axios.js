import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";
import { refresh } from "./auth";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const accessToken = getCookie("accessToken");

  if (accessToken) {
    const newConfig = config;
    newConfig.headers.Authorization = `Bearer ${accessToken}`;

    return newConfig;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401) {
      try {
        const originRequest = config;
        const { accessToken, refreshTokenExpirationInMilliSeconds } =
          await refresh();
        const expires = new Date(refreshTokenExpirationInMilliSeconds);

        setCookie("accessToken", accessToken, { path: "/", expires });
        originRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
);
