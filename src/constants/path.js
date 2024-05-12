export const PATH = {
  home: "/",
  login: "/login",
  boardWithType: (type) => `/board?type=${type}`,
  createBoardWithType: (type) => `/create/board?type=${type}`,
  postWithIdAndType: (id, type) => `/board/post/${id}?type=${type}`,
  postUpdateWithIdAndType: (id, type) =>
    `/board/post/${id}/update?type=${type}`,
  chatList: "/chatList",
  chatting: (id) => `/chatting/${id}`,
  profile: "/profile",
  userDetail: (id) => `/user/${id}`,
  loginCallback: (provider) => `/oauth2/callback/${provider}`,
};
