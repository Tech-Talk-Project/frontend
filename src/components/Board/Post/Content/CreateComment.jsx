import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomEditor from "ckeditor5-custom-build/build/ckeditor";
import { editorConfiguration } from "../../../Profile/Description/DescriptionEditor/Plugin";
import { Typography } from "@material-tailwind/react";
import Button from "../../../Common/Button";
import { useMutation } from "@tanstack/react-query";
import { createCommnet } from "../../../../apis/board";
import { queryClient } from "../../../../apis/queryClient";
import { BOARD_QUERY_KEYS } from "../../../../constants/queryKeys";
import { useParams, useSearchParams } from "react-router-dom";

export default function CreateComment() {
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("type").toUpperCase();
  const [isCreate, setIsCreate] = useState(false);
  const [content, setContent] = useState("");
  const createCommentMutate = useMutation({
    mutationFn: () => createCommnet({ boardId: postId, content, category }),
    onSuccess: () => {
      queryClient.invalidateQueries(BOARD_QUERY_KEYS.post(postId));
      setIsCreate(false);
      setContent("");
    },
  });

  const handleCreateClick = () => {
    setIsCreate((prev) => !prev);
    setContent("");
  };
  const handleSubmit = () => {
    createCommentMutate.mutate({
      boardId: postId,
      content,
      category,
    });
  };
  return (
    <article className="flex flex-col gap-2">
      <Typography variant="h6">댓글</Typography>
      {isCreate ? (
        <>
          <CKEditor
            editor={CustomEditor}
            data={content}
            config={editorConfiguration}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
          />
          <div className="flex justify-end gap-4 py-4">
            <Button
              className="py-2 text-sm hover:bg-white hover:text-black"
              onClick={handleCreateClick}
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
        <Button
          className="w-full border border-blue-gray-800 hover:border-brand"
          onClick={handleCreateClick}
        >
          <Typography>댓글을 작성해보세요.</Typography>
        </Button>
      )}
    </article>
  );
}
