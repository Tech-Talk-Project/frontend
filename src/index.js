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
import BoardPage from "./pages/BoardPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostPage from "./pages/PostPage";
import LoginProtectedRoute from "./pages/ProtectedRoute/LoginProtectedRoute";
import NoTypeProtectedRoute from "./pages/ProtectedRoute/NoTypeProtectedRoute";
import PostUpdatePage from "./pages/PostUpdatePage";

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
            path: "/board",
            element: (
              <NoTypeProtectedRoute>
                <BoardPage />
              </NoTypeProtectedRoute>
            ),
          },
          {
            path: "/create/board",
            element: (
              <NoTypeProtectedRoute>
                <PostCreatePage />
              </NoTypeProtectedRoute>
            ),
          },
          {
            path: "/board/post/:postId",
            element: (
              <NoTypeProtectedRoute>
                <PostPage />
              </NoTypeProtectedRoute>
            ),
          },
          {
            path: "/board/post/:postId/update",
            element: (
              <NoTypeProtectedRoute>
                <PostUpdatePage />
              </NoTypeProtectedRoute>
            ),
          },
          {
            path: "/chatList",
            element: (
              <LoginProtectedRoute>
                <ChatListPage />
              </LoginProtectedRoute>
            ),
          },
          {
            path: "/chatting/:chatRoomId",
            element: (
              <LoginProtectedRoute>
                <ChattingPage />
              </LoginProtectedRoute>
            ),
          },
          {
            path: "/profile",
            element: (
              <LoginProtectedRoute>
                <ProfilePage />
              </LoginProtectedRoute>
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
