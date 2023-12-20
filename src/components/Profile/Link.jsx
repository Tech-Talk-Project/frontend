import React from "react";
import { MdOutlineLink } from "react-icons/md";

export default function Link({ link }) {
  return (
    <li>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 w-fit font-semibold cursor-pointer duration-100 hover:text-brand hover:underline"
      >
        <MdOutlineLink className=" -rotate-45" size={20} />
        <span>{link}</span>
      </a>
    </li>
  );
}
