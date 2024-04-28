import { useEffect, useState } from "react";
import useBreakpoint from "./useBreakPoint";

export default function usePagination({ page, setPage, totalPage }) {
  const [pageStart, setPageStart] = useState(1);
  const { isSmallMobile } = useBreakpoint();
  const [length, setLength] = useState(isSmallMobile ? 3 : 5);

  const getItemProps = (value) => ({
    variant: page === value ? "filled" : "text",
    color: "white",
    className: `${page === value ? "bg-brand text-white" : ""} ${
      isSmallMobile ? "w-8 h-8" : ""
    }`,
    ripple: false,
    onClick: () => {
      setPage(value);
      if (value < page) {
        if (page % length === 1) setPageStart(page - length);
      } else {
        if (page % length === 0) setPageStart(page + 1);
      }
    },
  });
  const handleNextClick = () => {
    if (page === totalPage) return;

    if (page % length === 0) setPageStart(page + 1);
    setPage((prev) => prev + 1);
  };
  const handleLastPageClick = () => {
    setPage(totalPage);
    setPageStart(totalPage - ((totalPage % length) - 1));
  };
  const handlePrevClick = () => {
    if (page === 1) return;

    if (page % length === 1) setPageStart(page - length);
    setPage((prev) => prev - 1);
  };
  const handleFirstPageClick = () => {
    setPage(1);
    setPageStart(1);
  };

  useEffect(() => {
    setLength((prev) => (prev === 3 ? 5 : 3));
  }, [isSmallMobile]);
  return {
    length,
    pageStart,
    getItemProps,
    handleNextClick,
    handleFirstPageClick,
    handleLastPageClick,
    handlePrevClick,
  };
}
