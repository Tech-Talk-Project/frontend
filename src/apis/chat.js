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
    .get(`${ENDPOINT}/room`, {
      params: { chatRoomId },
    })
    .then((response) => response.data);

export const getChattingWithCursor = ({ chatRoomId, cursor }) =>
  instance
    .get(`${ENDPOINT}/message/cursor`, {
      params: { chatRoomId, cursor },
    })
    .then((response) => response.data);

export const disconnectChatRoom = ({ chatRoomId }) =>
  instance
    .get(`${ENDPOINT}/out`, { params: { chatRoomId } })
    .then((response) => response.data);

export const exitChatRoom = ({ chatRoomId }) =>
  instance
    .post(`${ENDPOINT}/leave`, { chatRoomId })
    .then((response) => response.data);

export const changeRoomTitle = ({ chatRoomId, newTitle }) =>
  instance
    .post(`${ENDPOINT}/change-title`, {
      chatRoomId,
      newTitle,
    })
    .then((response) => response.data);

export const inviteUserWithEmail = ({ chatRoomId, memberId }) =>
  instance
    .post(`${ENDPOINT}/invite`, {
      chatRoomId,
      invitedMemberId: memberId,
    })
    .then((response) => response.data);
