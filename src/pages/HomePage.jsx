import React, { useState } from "react";
import SideBar from "../components/Main/SideBar";
import Categories from "../components/Main/Categories";

export default function HomePage() {
  const [filter, setFilter] = useState("frontend");

  return (
    <main className="flex w-full h-full">
      <SideBar onFilterClick={setFilter} />
      <Categories filter={filter} />
    </main>
  );
}
