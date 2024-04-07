import { Spinner } from "@material-tailwind/react";
import { Suspense, useEffect } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/Error/ErrorBoundary";
import GlobalErrorFallback from "./components/Common/GlobalErrorFallback";
import { useSetRecoilState } from "recoil";
import prevChatRoomIdState from "./recoil/atoms/chatRoomId";
import { createNewChatState, newChatMemberState } from "./recoil/atoms/newChat";
import Toast from "./components/Common/Toast";

function App() {
  const location = useLocation();
  const setPrevChatRoomId = useSetRecoilState(prevChatRoomIdState);
  const setNewChatMembers = useSetRecoilState(newChatMemberState);
  const setCreateNewChat = useSetRecoilState(createNewChatState);

  useEffect(() => {
    if (location.pathname !== "/chatList") {
      setPrevChatRoomId(null);
    }
  }, [location, setPrevChatRoomId]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setCreateNewChat(false);
      setNewChatMembers([]);
    }
  }, [location, setCreateNewChat, setNewChatMembers]);
  return (
    <Suspense fallback={<Spinner />}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary fallback={GlobalErrorFallback} onReset={reset}>
            <Outlet />
            <Toast />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Suspense>
  );
}

export default App;
