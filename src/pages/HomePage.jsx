import React, { Suspense, useEffect, useState } from "react";
import SideBar from "../components/Main/SideBar";
import Categories from "../components/Main/Categories";
import { Spinner } from "@material-tailwind/react";
import MainPageMain from "../components/Main/MainPageMain";
import { useRecoilValue } from "recoil";
import filterState from "../recoil/atoms/filter";

export default function HomePage() {
  const filter = useRecoilValue(filterState);
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
    <main className="relative flex w-full h-full">
      <SideBar />
      <div className="flex flex-col p-4 md:ml-64 w-full">
        <Categories
          filter={filter}
          filters={filters}
          onFilterClick={handleFilterClick}
        />
        <Suspense fallback={<Spinner />}>
          <MainPageMain filters={filters} />
        </Suspense>
      </div>
    </main>
  );
}
