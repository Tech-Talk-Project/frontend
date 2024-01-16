import React from "react";
import { Outlet } from "react-router-dom";

export default function NoHeaderLayout() {
  return (
    <div className="flex justify-center items-center mx-auto max-w-7xl w-full min-h-screen h-full">
      <Outlet />
    </div>
  );
}
