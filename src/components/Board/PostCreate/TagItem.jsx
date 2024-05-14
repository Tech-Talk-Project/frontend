import React from "react";
import { MdClose } from "@react-icons/all-files/md/MdClose";

export default function TagItem({ tag, index, setTags }) {
  const handleClick = () => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <li
      className="flex items-center gap-2 shrink-0 py-1 px-2 bg-blue-gray-800 rounded-md hover:bg-brand duration-150 cursor-pointer"
      onClick={handleClick}
    >
      <p className="font-bold">{tag}</p>
      <MdClose size={16} />
    </li>
  );
}
