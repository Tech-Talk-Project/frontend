import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className="max-w-7xl">
        <Outlet />
      </div>
    </>
  );
}
