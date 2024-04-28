import { useState } from "react";

export default function usePagination({ page, setPage, totalPage }) {
  // const [page, setPage] = useState(1);
  const [pageStart, setPageStart] = useState(1);

  const getItemProps = (value) => ({
    variant: page === value ? "filled" : "text",
    color: "white",
    className: `${page === value ? "bg-brand text-white" : ""}`,
    ripple: false,
    onClick: () => {
      setPage(value);
      if (value < page) {
        if (page % 5 === 1) setPageStart(page - 5);
      } else {
        if (page % 5 === 0) setPageStart(page + 1);
      }
    },
  });
  const handleNextClick = () => {
    if (page === totalPage) return;

    if (page % 5 === 0) setPageStart(page + 1);
    setPage((prev) => prev + 1);
  };
  const handleLastPageClick = () => {
    setPage(totalPage);
    setPageStart(totalPage - ((totalPage % 5) - 1));
  };
  const handlePrevClick = () => {
    if (page === 1) return;

    if (page % 5 === 1) setPageStart(page - 5);
    setPage((prev) => prev - 1);
  };
  const handleFirstPageClick = () => {
    setPage(1);
    setPageStart(1);
  };

  return {
    pageStart,
    getItemProps,
    handleNextClick,
    handleFirstPageClick,
    handleLastPageClick,
    handlePrevClick,
  };
}
