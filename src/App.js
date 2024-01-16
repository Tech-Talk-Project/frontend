import { Spinner } from "@material-tailwind/react";
import { Suspense } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "./components/Error/ErrorBoundary";
import GlobalErrorFallback from "./components/Common/GlobalErrorFallback";

function App() {
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
