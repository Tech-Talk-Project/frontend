import { Spinner } from "@material-tailwind/react";
import { Suspense, useEffect } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/Error/ErrorBoundary";
import GlobalErrorFallback from "./components/Common/GlobalErrorFallback";
import { useSetRecoilState } from "recoil";
import prevChatRoomIdState from "./recoil/atoms/chatRoomId";

function App() {
  const location = useLocation();
  const setPrevChatRoomId = useSetRecoilState(prevChatRoomIdState);

  useEffect(() => {
    if (location.pathname !== "/chatList") {
      setPrevChatRoomId(null);
    }
  }, [location, setPrevChatRoomId]);
  return (
    <Suspense fallback={<Spinner />}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary fallback={GlobalErrorFallback} onReset={reset}>
            <Outlet />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Suspense>
  );
}

export default App;
