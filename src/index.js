import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@material-tailwind/react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import MainLayout from "./layouts/MainLayout";
import NoHeaderLayout from "./layouts/NoHeaderLayout";
import LoginCallbackPage from "./pages/LoginCallbackPage";
import { queryClient } from "./apis/queryClient";
import ChatListPage from "./pages/ChatListPage";
import ChattingPage from "./pages/ChattingPage";
import UserDetailPage from "./pages/UserDetailPage";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "/chatList",
            element: (
              <ProtectedRoute>
                <ChatListPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "/chatting/:chatRoomId",
            element: (
              <ProtectedRoute>
                <ChattingPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "/profile",
            element: (
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            ),
          },
          {
            path: "/user/:selectedMemberId",
            element: <UserDetailPage />,
          },
        ],
      },
      {
        element: <NoHeaderLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/oauth2/callback/:provider",
            element: <LoginCallbackPage />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          >
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={true} />
          </GoogleOAuthProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
