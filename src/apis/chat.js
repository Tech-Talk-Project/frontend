import { instance } from "./axios";

const ENDPOINT = "/user/chat";

export const getChatList = () =>
  instance.get(`${ENDPOINT}/rooms`).then((response) => response.data);

export const createChatRoom = ({ title, memberIds }) =>
  instance
    .post(`${ENDPOINT}/create`, { title, memberIds })
    .then((response) => response.data);

export const getChattingData = ({ chatRoomId }) =>
  instance
    .post(`${ENDPOINT}/room`, {
      chatRoomId,
    })
    .then((response) => response.data);
