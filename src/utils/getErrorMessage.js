export const getErrorMessage = (error) => {
  const status = error.response?.status;

  switch (status) {
    // global에서 400은 refresh 요청에 대한 에러 처리
    case 400:
    case 401:
    case 403:
      return {
        title: "해당 페이지에 대한 접근 권한이 없습니다.",
        content: "",
        buttonMessage: "홈으로 이동",
        path: "/",
      };
    case 500:
      return {
        title: "서버 오류로 인해 요청을 처리할 수 없습니다.",
        content: "잠시 후 다시 시도해주세요.",
        buttonMessage: "다시 시도",
        path: "/",
      };
    default:
      return {
        title: error.message,
        content: status,
        buttonMessage: "새로고침",
      };
  }
};
