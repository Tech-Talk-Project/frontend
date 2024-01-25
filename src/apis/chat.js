import { instance } from "./axios";

const ENDPOINT = "/user/chat";

export const getChatList = () =>
  instance.get(`${ENDPOINT}/room/rooms`).then((response) => response.data);

export const createChatRoom = ({ title, memberIds }) =>
  instance
    .post(`${ENDPOINT}/room/create`, { title, memberIds })
    .then((response) => response.data);
