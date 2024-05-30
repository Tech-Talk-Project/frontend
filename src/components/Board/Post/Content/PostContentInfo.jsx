import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Chip, Typography } from "@material-tailwind/react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import RecruitmentToggle from "./RecruitmentToggle";
import { getDateInfo } from "../../../../utils/date";
import useBreakpoint from "../../../../hooks/useBreakPoint";
import { memberIdState } from "../../../../recoil/atoms/auth";
import { BOARD_CATEGORIE_WITHOUT_TOGGLE_TYPES } from "../../../../constants/category";
import Button from "../../../Common/Button";
import useModal from "../../../../hooks/useModal";
import DeleteConfirmModal from "../Common/DeleteConfirmModal";
import useBoard from "../../../../hooks/useBoard";
import { PATH } from "../../../../constants/path";

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
  const { changeRecruitmentMutate, postDeleteMutate } = useBoard({ postId });

  const handleRecruitmentClick = () => {
    changeRecruitmentMutate.mutate(
      {
        category: category.toUpperCase(),
      },
      {
        onSuccess: () => {
          setIsRecruitmentActive((prev) => !prev);
        },
      }
    );
  };
  const handleUpdateClick = () => {
    navigate(PATH.postUpdateWithIdAndType(postId, category));
  };
  const handleDeleteModalClick = () => {
    setIsDeleteModalOpen();
  };
  const handleDeleteClick = () => {
    postDeleteMutate.mutate(
      { category: category.toUpperCase() },
      {
        onSuccess: () => {
          navigate(PATH.boardWithType(category));
        },
      }
    );
  };
  return (
    <article className="flex flex-col md:flex-row gap-2 md:items-end justify-between pb-4 border-b border-blue-gray-800">
      <div className="flex flex-col">
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
      <div className="flex flex-col items-end gap-2 min-w-fit">
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
        title="정말 게시글을 삭제하시겠습니까?"
        content="확인 버튼 클릭 시, 게시글은 삭제되며 복구할 수 없습니다."
      />
    </article>
  );
}
