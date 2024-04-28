import React from "react";
import { Chip, Typography } from "@material-tailwind/react";
import { useSearchParams } from "react-router-dom";
import { MdOutlineRemoveRedEye, MdThumbUp } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import Tags from "./Tags";
import { getDateInfo } from "../../../utils/date";
import { BOARD_CATEGORIE_WITHOUT_TOGGLE_TYPES } from "../../../constants/category";
import useBreakpoint from "../../../hooks/useBreakPoint";

export default function Post({
  post: {
    title,
    content,
    recruitmentActive,
    tags,
    author,
    createdAt,
    updatedAt,
    viewCount,
    likeCount,
    commentCount,
  },
}) {
  const { isSmallMobile } = useBreakpoint();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  return (
    <li className="flex flex-col gap-1 p-3 border-b border-blue-gray-800">
      <div className="flex items-center gap-3">
        {!BOARD_CATEGORIE_WITHOUT_TOGGLE_TYPES.includes(type) && (
          <Chip
            size="md"
            value={recruitmentActive ? "모집중" : "모집마감"}
            className={recruitmentActive ? "bg-brand" : ""}
          />
        )}
        <Typography variant="h5">{title}</Typography>
      </div>
      <Typography
        variant="h5"
        className="text-blue-gray-200 font-medium truncate"
      >
        {content}
      </Typography>
      <Tags tags={tags} />
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Typography variant="small" className="text-white font-medium">
            {author.name}
          </Typography>
          {!isSmallMobile && (
            <Typography variant="small" className="text-white font-medium">
              {updatedAt
                ? getDateInfo(new Date(updatedAt))
                : getDateInfo(new Date(createdAt))}
            </Typography>
          )}
        </div>
        <ul className="flex items-center gap-4">
          <li className="flex items-center gap-2 text-white font-medium">
            <MdOutlineRemoveRedEye />
            <Typography className="mt-1">{viewCount}</Typography>
          </li>
          <li className="flex items-center gap-2 text-white font-medium">
            <MdThumbUp />
            <Typography className="mt-1">{likeCount}</Typography>
          </li>
          <li className="flex items-center gap-2 text-white font-medium">
            <BsFillChatDotsFill />
            <Typography className="mt-1">{commentCount}</Typography>
          </li>
        </ul>
      </div>
    </li>
  );
}
