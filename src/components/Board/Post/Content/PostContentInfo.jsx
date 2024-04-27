import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Chip, Typography } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import RecruitmentToggle from "./RecruitmentToggle";
import { changeRecruitment } from "../../../../apis/board";
import { getDateInfo } from "../../../../utils/date";
import useBreakpoint from "../../../../hooks/useBreakPoint";
import { toastState } from "../../../../recoil/atoms/toast";
import { memberIdState } from "../../../../recoil/atoms/auth";
import { BOARD_CATEGORIE_WITHOUT_TOGGLE_TYPES } from "../../../../constants/category";
import Button from "../../../Common/Button";

export default function PostContentInfo({
  author: { memberId: authorId },
  title,
  updatedAt,
  createdAt,
  recruitmentActive,
  viewCount,
  content,
  tags,
}) {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("type");
  const { isSmallMobile } = useBreakpoint();
  const [isRecruitmentActive, setIsRecruitmentActive] =
    useState(recruitmentActive);
  const memberId = useRecoilValue(memberIdState);
  const setToast = useSetRecoilState(toastState);
  const changeRecruitmentMutate = useMutation({
    mutationFn: changeRecruitment,
    onSuccess: () => {
      setIsRecruitmentActive((prev) => !prev);
    },
    onError: () => {
      setToast({
        isOpen: true,
        message: "잠시후 다시 시도해주세요.",
      });
      setTimeout(() => {
        setToast({ isOpen: false, message: "" });
      }, 3000);
    },
  });

  const handleRecruitmentClick = () => {
    changeRecruitmentMutate.mutate({
      postId,
      category: category.toUpperCase(),
    });
  };
  const handleUpdateClick = () => {
    navigate(`/board/post/${postId}/update?type=${category}`);
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
      <div className="flex flex-col items-end gap-2">
        {memberId === authorId && (
          <Button
            variant="text"
            color="white"
            className="p-1 text-base font-normal hover:bg-transparent hover:underline active:bg-transparent"
            onClick={handleUpdateClick}
          >
            수정
          </Button>
        )}
        {!BOARD_CATEGORIE_WITHOUT_TOGGLE_TYPES.includes(category) &&
          (memberId === authorId ? (
            <RecruitmentToggle
              recruitmentActive={isRecruitmentActive}
              onClick={handleRecruitmentClick}
            />
          ) : (
            <Chip
              size="md"
              value={isRecruitmentActive ? "모집중" : "모집마감"}
              className={`${isRecruitmentActive ? "bg-brand" : ""}`}
            />
          ))}
      </div>
    </article>
  );
}
