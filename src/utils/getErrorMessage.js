export const getErrorMessage = (error) => {
  const status = error.response?.status;

  switch (status) {
    case 403:
      return {
        title: "해당 페이지에 대한 접근 권한이 없습니다.",
        content: "",
        buttonMessage: "홈으로 이동",
      };
    case 409:
      return {
        title: "이미 해당 이메일의 아이디가 존재합니다.",
        content: "다른 소셜 서비스로 로그인해주세요.",
        buttonMessage: "로그인 페이지로 이동",
      };
    default:
      return {
        title: error.message,
        content: status,
        buttonMessage: "새로고침",
      };
  }
};
