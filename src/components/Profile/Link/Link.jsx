import React from "react";
import { MdOutlineLink, MdClose } from "react-icons/md";
import Button from "../../Common/Button";

export default function Link({ link, isEditing, index, remove }) {
  const handleLinkClick = (e) => {
    if (isEditing) {
      e.preventDefault();
    }
  };
  const handleRemoveClick = () => {
    remove(index);
  };
  return (
    <li className="flex justify-between items-center">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleLinkClick}
        className={`flex items-center gap-2 w-fit font-semibold duration-100 ${
          isEditing ? "cursor-default" : "hover:text-brand hover:underline"
        }`}
      >
        <MdOutlineLink className=" -rotate-45" size={20} />
        <span className=" max-w-[192px] overflow-x-auto">{link}</span>
      </a>
      {isEditing && (
        <Button
          variant="text"
          className="p-0 text-base_gray hover:text-brand duration-150"
          onClick={handleRemoveClick}
        >
          <MdClose size={20} />
        </Button>
      )}
    </li>
  );
}
