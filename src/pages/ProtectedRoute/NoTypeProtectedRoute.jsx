import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";

export default function NoTypeProtectedRoute({ children }) {
  const [searchParams] = useSearchParams();

  if (!searchParams.get("type")) {
    return <Navigate to="/board?type=project" replace />;
  }
  return children;
}
