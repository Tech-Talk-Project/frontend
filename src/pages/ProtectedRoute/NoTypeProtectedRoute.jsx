import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { BOARD_CATEGORIE_TYPES } from "../../constants/category";

export default function NoTypeProtectedRoute({ children }) {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  if (!type || !BOARD_CATEGORIE_TYPES.includes(type)) {
    return <Navigate to="/board?type=project" replace />;
  }
  return children;
}
