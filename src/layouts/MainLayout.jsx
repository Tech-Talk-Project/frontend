import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Common/Header/Header";

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className="relative mx-auto pt-14 sm:pt-20 max-w-7xl min-h-screen">
        <Outlet />
      </div>
    </>
  );
}
