import React, { Suspense, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { BsFillChatDotsFill } from "react-icons/bs";
import SideBar from "../components/Main/SideBar/SideBar";
import Categories from "../components/Main/Category/Categories";
import filterState from "../recoil/atoms/filter";
import { createNewChatState } from "../recoil/atoms/newChat";
import Button from "../components/Common/Button";
import useModal from "../hooks/useModal";
import CreateChatButtonGroup from "../components/Main/Common/CreateChatButtonGroup";
import UserGridSkeleton from "../components/Main/User/Skeleton/UserGridSkeleton";
import { isLoggedInState } from "../recoil/atoms/auth";
import MainPageMain from "../components/Main/MainPageMain";
import FollowingPage from "../components/Main/FollowingPage";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import ErrorBoundary from "../components/Error/ErrorBoundary";
import MainErrorFallback from "../components/Main/MainErrorFallback";

export default function HomePage() {
  const [isOpen, handleModalClick] = useModal();
  const [filters, setFilters] = useState([]);
  const filter = useRecoilValue(filterState);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [createNewChat, setCreateNewChat] = useRecoilState(createNewChatState);

  const handleNewChatClick = () => {
    setCreateNewChat((prev) => !prev);
  };
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
              <Button
                variant="text"
                className="fixed bottom-8 right-7 md:left-7 md:right-auto p-3 text-white bg-brand hover:bg-white hover:text-brand rounded-full"
                onClick={handleNewChatClick}
              >
                <BsFillChatDotsFill size={24} />
              </Button>
            )}
          </main>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
