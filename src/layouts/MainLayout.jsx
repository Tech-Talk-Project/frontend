import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className="mx-auto mt-20 max-w-7xl min-h-screen">
        <Outlet />
      </div>
    </>
  );
}
