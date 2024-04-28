import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BOARD_QUERY_KEYS } from "../../../constants/queryKeys";
import { getBoardData } from "../../../apis/board";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../Main/Common/Pagination";
import NullBoard from "./NullBoard";

export default function BoardPageMain() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [page, setPage] = useState(1);
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
      {boardList.length === 0 ? (
        <NullBoard onCreateClick={handleCreateClick} />
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
