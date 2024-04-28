import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Chip, Typography } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import RecruitmentToggle from "./RecruitmentToggle";
import { changeRecruitment, deletePost } from "../../../../apis/board";
import { getDateInfo } from "../../../../utils/date";
import useBreakpoint from "../../../../hooks/useBreakPoint";
import { toastState } from "../../../../recoil/atoms/toast";
import { memberIdState } from "../../../../recoil/atoms/auth";
import { BOARD_CATEGORIE_WITHOUT_TOGGLE_TYPES } from "../../../../constants/category";
import Button from "../../../Common/Button";
import useModal from "../../../../hooks/useModal";
import DeleteConfirmModal from "../Common/DeleteConfirmModal";

export default function PostContentInfo({
  author: { memberId: authorId },
  title,
  updatedAt,
  createdAt,
  recruitmentActive,
  viewCount,
}) {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("type");
  const { isSmallMobile } = useBreakpoint();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useModal();
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
  const postDeleteMutate = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      navigate(`/board?type=${category}`);
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
  const handleDeleteModalClick = () => {
    setIsDeleteModalOpen();
  };
  const handleDeleteClick = () => {
    postDeleteMutate.mutate({ postId, category: category.toUpperCase() });
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
          <div className="flex gap-2">
            <Button
              variant="text"
              color="red"
              className="p-1 text-base font-normal hover:bg-transparent hover:underline active:bg-transparent"
              onClick={handleDeleteModalClick}
            >
              삭제
            </Button>
            <Button
              variant="text"
              color="white"
              className="p-1 text-base font-normal hover:bg-transparent hover:underline active:bg-transparent"
              onClick={handleUpdateClick}
            >
              수정
            </Button>
          </div>
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
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        onDeleteClick={handleDeleteClick}
      />
    </article>
  );
}
