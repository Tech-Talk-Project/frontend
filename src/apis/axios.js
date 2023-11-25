import axios from "axios";
import { getCookie } from "../utils/cookie";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use((config) => {
  const accessToken = getCookie("access-token");
  if (accessToken) {
    const newConfig = config;
    newConfig.headers.Authorization = accessToken;

    return newConfig;
  }
  return config;
});
