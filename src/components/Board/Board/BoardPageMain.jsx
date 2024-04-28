import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import Button from "../../Common/Button";
import { isLoggedInState } from "../../../recoil/atoms/auth";
import { BOARD_QUERY_KEYS } from "../../../constants/queryKeys";
import { getBoardData } from "../../../apis/board";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../Main/Common/Pagination";

export default function BoardPageMain() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [page, setPage] = useState(1);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const {
    data: { boardList, totalPage },
  } = useSuspenseQuery({
    queryKey: BOARD_QUERY_KEYS.board(page, type),
    queryFn: () => getBoardData({ page, category: type.toUpperCase() }),
    keepPreviousData: true,
  });
  const {
    pageStart,
    getItemProps,
    handleNextClick,
    handleFirstPageClick,
    handleLastPageClick,
    handlePrevClick,
  } = usePagination({ page, setPage, totalPage });

  const handleCreateClick = () => {
    navigate(`/create/board?type=${type}`);
  };

  return (
    <section className="h-full">
      {isLoggedIn && <Button onClick={handleCreateClick}>글쓰기</Button>}
      {boardList.length === 0 ? (
        <span>null</span>
      ) : (
        <>
          <Pagination
            pageStart={pageStart}
            page={page}
            totalPage={totalPage}
            onFirstPageClick={handleFirstPageClick}
            onLastPageClick={handleLastPageClick}
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
            getItemProps={getItemProps}
          />
        </>
      )}
    </section>
  );
}
