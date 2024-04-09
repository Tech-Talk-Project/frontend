import React from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { IconButton } from "@material-tailwind/react";
import Button from "../../Common/Button";

export default function Pagination({
  pageStart,
  page,
  totalPage,
  onNextClick,
  onLastPageClick,
  onPrevClick,
  onFirstPageClick,
  getItemProps,
}) {
  return (
    <div className="flex justify-center items-center gap-4 py-4">
      <Button
        variant="text"
        className="flex items-center gap-2 p-1 text-white hover:text-brand"
        onClick={onFirstPageClick}
        disabled={page === 1}
      >
        <MdOutlineKeyboardDoubleArrowLeft size={24} />
      </Button>
      <Button
        variant="text"
        className="flex items-center gap-2 p-1 text-white hover:text-brand"
        onClick={onPrevClick}
        disabled={page === 1}
      >
        <MdOutlineKeyboardArrowLeft size={24} />
      </Button>
      <div className="flex items-center gap-2">
        {Array.from(
          {
            length: totalPage - pageStart >= 5 ? 5 : totalPage - pageStart + 1,
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
        className="flex items-center gap-2 p-1 text-white hover:text-brand"
        onClick={onNextClick}
        disabled={page === totalPage}
      >
        <MdOutlineKeyboardArrowRight size={24} />
      </Button>
      <Button
        variant="text"
        className="flex items-center gap-2 p-1 text-white hover:text-brand"
        onClick={onLastPageClick}
        disabled={page === totalPage}
      >
        <MdOutlineKeyboardDoubleArrowRight size={24} />
      </Button>
    </div>
  );
}
