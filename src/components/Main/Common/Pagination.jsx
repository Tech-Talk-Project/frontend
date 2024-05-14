import React from "react";
import { v4 as uuidv4 } from "uuid";
import { IconButton } from "@material-tailwind/react";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";
import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight";
import Button from "../../Common/Button";
import useBreakpoint from "../../../hooks/useBreakPoint";

export default function Pagination({
  length,
  pageStart,
  page,
  totalPage,
  onNextClick,
  onLastPageClick,
  onPrevClick,
  onFirstPageClick,
  getItemProps,
}) {
  const { isSmallMobile } = useBreakpoint();
  return (
    <div className="flex justify-center items-center gap-4 py-4">
      {!isSmallMobile && (
        <Button
          variant="text"
          className="flex items-center gap-2 p-1 text-white hover:text-brand focus:text-white"
          onClick={onFirstPageClick}
          disabled={page === 1}
        >
          <MdKeyboardArrowLeft size={24} />
        </Button>
      )}
      <Button
        variant="text"
        className="flex items-center gap-2 p-1 text-white hover:text-brand focus:text-white"
        onClick={onPrevClick}
        disabled={page === 1}
      >
        <MdKeyboardArrowLeft size={24} />
      </Button>
      <div className="flex items-center gap-2">
        {Array.from(
          {
            length:
              totalPage - pageStart >= length
                ? length
                : totalPage - pageStart + 1,
          },
          (_, index) => pageStart + index
        ).map((value) => (
          <IconButton key={uuidv4()} {...getItemProps(value)}>
            {value}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 p-1 text-white hover:text-brand focus:text-white"
        onClick={onNextClick}
        disabled={page === totalPage}
      >
        <MdKeyboardArrowRight size={24} />
      </Button>
      {!isSmallMobile && (
        <Button
          variant="text"
          className="flex items-center gap-2 p-1 text-white hover:text-brand focus:text-white"
          onClick={onLastPageClick}
          disabled={page === totalPage}
        >
          <MdKeyboardArrowRight size={24} />
        </Button>
      )}
    </div>
  );
}
