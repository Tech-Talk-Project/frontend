import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { getDateInfo } from "../../../../utils/date";
import RecruitmentToggle from "./RecruitmentToggle";
import { useMutation } from "@tanstack/react-query";
import { changeRecruitment } from "../../../../apis/board";
import { useParams, useSearchParams } from "react-router-dom";
import useBreakpoint from "../../../../hooks/useBreakPoint";

export default function PostContentInfo({
  title,
  updatedAt,
  createdAt,
  recruitmentActive,
  viewCount,
}) {
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("type").toUpperCase();
  const { isSmallMobile } = useBreakpoint();
  const [isRecruitmentActive, setIsRecruitmentActive] =
    useState(recruitmentActive);
  const changeRecruitmentMutate = useMutation({
    mutationFn: () => changeRecruitment({ postId, category }),
    onSuccess: () => {
      setIsRecruitmentActive((prev) => !prev);
    },
  });

  const handleRecruitmentClick = () => {
    changeRecruitmentMutate.mutate({ postId, category });
  };
  return (
    <article className="flex flex-col md:flex-row gap-2 md:items-end justify-between pb-4 border-b border-blue-gray-800">
      <div className="">
        <Typography variant={`${isSmallMobile ? "h4" : "h3"}`}>
          {title}
        </Typography>
        <div className="flex gap-3">
          <Typography className="text-blue-gray-200">
            {updatedAt
              ? getDateInfo(new Date(updatedAt))
              : getDateInfo(new Date(createdAt))}{" "}
            작성
          </Typography>
          <Typography className="text-blue-gray-200">
            조회수 {viewCount}
          </Typography>
        </div>
      </div>
      <RecruitmentToggle
        recruitmentActive={isRecruitmentActive}
        onClick={handleRecruitmentClick}
      />
    </article>
  );
}
