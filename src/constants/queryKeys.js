export const AUTH_QUERY_KEYS = {
  login: ["login"],
};

export const USERS_QUERY_KEYS = {
  usersData: (categories) => ["usersData", categories],
  userData: (memberId) => ["userData", memberId],
  userDataWithFollowData: (memberId) => ["userDataWithFollowData", memberId],
  followingUsers: ["followingUsers"],
};

export const PROFILE_QUERY_KEYS = {
  myProfile: ["myProfile"],
};

export const CHAT_QUERY_KEYS = {
  chatList: ["chatList"],
  chatData: (chatRoomId) => ["chatData", chatRoomId],
  chatDataWithCursor: (chatRoomId) => ["chatDataWithCursor", chatRoomId],
};
