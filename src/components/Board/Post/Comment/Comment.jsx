import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Typography } from "@material-tailwind/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useParams, useSearchParams } from "react-router-dom";
import CustomEditor from "ckeditor5-custom-build/build/ckeditor";
import { useMutation } from "@tanstack/react-query";
import { editorConfiguration } from "../../../Profile/Description/DescriptionEditor/Plugin";
import ProfileImage from "../../../Common/Image/ProfileImage";
import Content from "../Common/Content";
import Button from "../../../Common/Button";
import { getDateInfo } from "../../../../utils/date";
import { updateComment } from "../../../../apis/board";
import { queryClient } from "../../../../apis/queryClient";
import { BOARD_QUERY_KEYS } from "../../../../constants/queryKeys";
import { memberIdState } from "../../../../recoil/atoms/auth";

export default function Comment({
  comment: {
    author: { name, imageUrl, memberId: authorId },
    content,
    createdAt,
    updatedAt,
    commentId,
  },
  onModalClick,
}) {
  const { postId } = useParams();
  const [searchParmas, setSearchParams] = useSearchParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(content);
  const memberId = useRecoilValue(memberIdState);
  const updateMutate = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries(BOARD_QUERY_KEYS.post(postId));
    },
  });

  const handleUpdateClick = () => {
    setIsUpdating((prev) => !prev);
  };
  const handleDeleteClick = () => {
    setSearchParams({ type: searchParmas.get("type"), comment_id: commentId });
    onModalClick();
  };
  const handleCancelClick = () => {
    setIsUpdating((prev) => !prev);
    setUpdatedContent(content);
  };
  const handleSubmit = () => {
    updateMutate.mutate({ commentId, content: updatedContent });
  };
  return (
    <li className="border-b border-blue-gray-800">
      {isUpdating ? (
        <>
          <CKEditor
            editor={CustomEditor}
            data={updatedContent}
            config={editorConfiguration}
            onChange={(event, editor) => {
              const data = editor.getData();
              setUpdatedContent(data);
            }}
          />
          <div className="flex justify-end gap-4 py-4">
            <Button
              className="py-2 text-sm hover:bg-white hover:text-black"
              onClick={handleCancelClick}
            >
              취소
            </Button>
            <Button
              className="py-2 text-sm bg-brand hover:bg-white hover:text-brand"
              onClick={handleSubmit}
            >
              등록
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-end gap-4 pl-4">
            <div className="flex items-center gap-4">
              <ProfileImage size="sm" imageUrl={imageUrl} />
              <Typography variant="h5">{name}</Typography>
            </div>
            <div className="flex items-center gap-3">
              {memberId === authorId && (
                <>
                  <Button
                    variant="text"
                    color="red"
                    className="p-1 text-sm font-normal hover:underline hover:bg-transparent active:bg-transparent"
                    onClick={handleDeleteClick}
                  >
                    삭제
                  </Button>
                  <Button
                    variant="text"
                    color="white"
                    className="p-1 text-sm font-normal hover:underline hover:bg-transparent active:bg-transparent"
                    onClick={handleUpdateClick}
                  >
                    수정
                  </Button>
                </>
              )}
              <Typography className="hidden sm:block">
                {updatedAt
                  ? getDateInfo(new Date(updatedAt))
                  : getDateInfo(new Date(createdAt))}
              </Typography>
            </div>
          </div>
          <Content content={content} />
        </>
      )}
    </li>
  );
}
