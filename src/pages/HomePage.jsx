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
import FollowingUsersGrid from "../components/Main/Common/FollowingUsersGrid";
import EveryUsersGrid from "../components/Main/Common/EveryUsersGrid";

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
    <main className="relative flex w-full h-full">
      <SideBar isModalOpen={isOpen} onModalClick={handleModalClick} />
      <div className="relative flex flex-col mb-12 p-4 md:ml-64 w-full">
        <Categories
          filter={filter}
          filters={filters}
          onFilterClick={handleFilterClick}
        />
        <Suspense fallback={<UserGridSkeleton />}>
          {filter === "" ? (
            <FollowingUsersGrid />
          ) : (
            <EveryUsersGrid filters={filters} />
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
  );
}
