import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import SideBar from "../components/Main/SideBar/SideBar";
import Categories from "../components/Main/Category/Categories";
import filterState from "../recoil/atoms/filter";
import { createNewChatState } from "../recoil/atoms/newChat";
import useModal from "../hooks/useModal";
import CreateChatButtonGroup from "../components/Main/Common/CreateChatButtonGroup";
import UserGridSkeleton from "../components/Main/User/Skeleton/UserGridSkeleton";
import { isLoggedInState } from "../recoil/atoms/auth";
import MainPageMain from "../components/Main/MainPageMain";
import FollowingPage from "../components/Main/FollowingPage";
import ErrorBoundary from "../components/Error/ErrorBoundary";
import MainErrorFallback from "../components/Main/MainErrorFallback";
import CreateChatBtn from "../components/Main/SideBar/CreateChatBtn";
import SearchBar from "../components/Main/SearchBar";
import { Spinner } from "@material-tailwind/react";

export default function HomePage() {
  const [isOpen, handleModalClick] = useModal();
  const [filters, setFilters] = useState([]);
  const filter = useRecoilValue(filterState);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [createNewChat, setCreateNewChat] = useRecoilState(createNewChatState);

  const handleNewChatClick = useCallback(() => {
    setCreateNewChat((prev) => !prev);
  }, [setCreateNewChat]);
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
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={MainErrorFallback} onReset={reset}>
          <main className="relative flex w-full h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-5rem)]">
            <SideBar isModalOpen={isOpen} onModalClick={handleModalClick} />
            <div className="relative flex flex-col p-4 md:ml-64 w-full">
              <Categories
                filter={filter}
                filters={filters}
                onFilterClick={handleFilterClick}
              />
              {createNewChat && (
                <Suspense
                  fallback={
                    <div className="flex justify-center w-full">
                      <Spinner className="w-9 h-9 text-brand" />
                    </div>
                  }
                >
                  <SearchBar />
                </Suspense>
              )}
              <Suspense fallback={<UserGridSkeleton />}>
                {filter.length === 0 ? (
                  <FollowingPage />
                ) : (
                  <MainPageMain filters={filters} />
                )}
              </Suspense>
              {createNewChat && (
                <CreateChatButtonGroup
                  onModalClick={handleModalClick}
                  mobile={false}
                />
              )}
            </div>
            {isLoggedIn && !createNewChat && (
              <CreateChatBtn onNewChatClick={handleNewChatClick} />
            )}
          </main>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
