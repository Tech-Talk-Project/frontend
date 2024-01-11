import React, { useEffect, useState } from "react";
import SideBar from "../components/Main/SideBar";
import Categories from "../components/Main/Categories";

export default function HomePage() {
  const [filter, setFilter] = useState("frontend");
  const [filters, setFilters] = useState([]);

  const handleFilterClick = (value) => {
    if (filters.includes(value)) {
      setFilters((prev) => prev.filter((f) => f !== value));
      return;
    }

    setFilters((prev) => [...prev, value]);
  };

  useEffect(() => {
    setFilters([]);
  }, [filter]);
  return (
    <main className="flex w-full h-full">
      <SideBar filter={filter} onFilterClick={setFilter} />
      <Categories
        filter={filter}
        filters={filters}
        onFilterClick={handleFilterClick}
      />
    </main>
  );
}
