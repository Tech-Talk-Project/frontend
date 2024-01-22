import { instance } from "./axios";
import axios from "axios";

const ENDPOINT = "/user/chat";

export const getChatList = () =>
  instance.get(`${ENDPOINT}/room/rooms`).then((response) => response.data);

export const getFakeChatList = () =>
  axios.get("/data/chatRooms.json").then((res) => res.data);

export const createChatRoom = ({ title, memberIds }) =>
  instance
    .post(`${ENDPOINT}/room/create`, { title, memberIds })
    .then((response) => response.data);
