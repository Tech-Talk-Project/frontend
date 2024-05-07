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
import { queryClient } from "./apis/queryClient";
import MainLayout from "./layouts/MainLayout";
import NoHeaderLayout from "./layouts/NoHeaderLayout";
import LoginProtectedRoute from "./pages/ProtectedRoute/LoginProtectedRoute";
import NoTypeProtectedRoute from "./pages/ProtectedRoute/NoTypeProtectedRoute";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const LoginCallbackPage = React.lazy(() => import("./pages/LoginCallbackPage"));
const ChatListPage = React.lazy(() => import("./pages/ChatListPage"));
const ChattingPage = React.lazy(() => import("./pages/ChattingPage"));
const UserDetailPage = React.lazy(() => import("./pages/UserDetailPage"));
const BoardPage = React.lazy(() => import("./pages/BoardPage"));
const PostCreatePage = React.lazy(() => import("./pages/PostCreatePage"));
const PostPage = React.lazy(() => import("./pages/PostPage"));
const PostUpdatePage = React.lazy(() => import("./pages/PostUpdatePage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
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
