import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../recoil/atoms/auth";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}
