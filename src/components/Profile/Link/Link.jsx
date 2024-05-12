import React from "react";
import { MdClose } from "@react-icons/all-files/md/MdClose";
import { MdInsertLink } from "@react-icons/all-files/md/MdInsertLink";
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
        className={`flex items-start gap-2 w-fit font-semibold duration-100 ${
          isEditing ? "cursor-default" : "hover:text-brand hover:underline"
        }`}
      >
        <MdInsertLink className="-rotate-45 shrink-0" size={20} />
        <div className="line-clamp-2">
          <span className="max-w-[192px] break-all">{link}</span>
        </div>
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
