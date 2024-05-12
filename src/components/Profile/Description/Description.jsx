import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { MdEdit } from "@react-icons/all-files/md/MdEdit";
import Button from "../../Common/Button";
import ButtonGroup from "../Common/ButtonGroup";
import useProfiles from "../../../hooks/useProfiles";

const Editor = React.lazy(() => import("../../Common/Editor/Editor"));

export default function Description({ description }) {
  const { setDescriptionMutate } = useProfiles();
  const [content, setContent] = useState(description);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };
  const handleCancelClick = () => {
    setContent(description);
    handleEditClick();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setDescriptionMutate.mutate(
      { description: content },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };
  return (
    <article className="relative w-full h-full">
      {!isEditing && (
        <Button
          variant="text"
          className="absolute top-1 right-1 p-1 text-blue-gray-800 hover:text-brand duration-150 peer"
          onClick={handleEditClick}
        >
          <MdEdit size={20} />
        </Button>
      )}
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col justify-center items-center w-full h-full transition-colors duration-150 peer-hover:border-brand peer-hover:rounded-md ${
          isEditing ? "" : content ? "p-4 border" : "px-4 py-20 border"
        } border-blue-gray-800 rounded-md`}
      >
        {isEditing ? (
          <>
            <Editor content={content} onChange={setContent} readOnly={false} />
            <div className="w-full">
              <ButtonGroup onCancelClick={handleCancelClick} />
            </div>
          </>
        ) : description ? (
          <Editor content={content} onChange={setContent} readOnly={true} />
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Typography
              variant="paragraph"
              className="font-normal text-gray-600"
            >
              본인을 소개하는 글을 작성해보세요.
            </Typography>
            <Button
              className="text-sm font-semibold hover:bg-brand duration-150"
              onClick={handleEditClick}
            >
              작성하기
            </Button>
          </div>
        )}
      </form>
    </article>
  );
}
