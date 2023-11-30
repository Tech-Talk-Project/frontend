import axios from "axios";

const ENDPOINT = "/user";

export const fakeLogin = () =>
  axios.get("/data/profile.json").then((response) => response.data);
