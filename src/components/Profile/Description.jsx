import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import DescriptionEditor from "./DescriptionEditor/DescriptionEditor";
import Button from "../Common/Button";
import ButtonGroup from "./ButtonGroup";
import { MdEdit } from "react-icons/md";

export default function Description({ description }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };
  return (
    <article
      className={`relative flex flex-col justify-center items-center ${
        isEditing ? "" : "p-4 border"
      } w-full h-full border-line rounded-md`}
    >
      {!isEditing && (
        <Button
          variant="text"
          className="absolute top-1 right-1 p-1 text-base_gray hover:text-brand duration-150 peer"
          onClick={handleEditClick}
        >
          <MdEdit size={20} />
        </Button>
      )}
      <form className="flex flex-col mb-8 w-full h-full">
        {description ? (
          <>
            <DescriptionEditor content={description} readOnly={!isEditing} />
            {isEditing && <ButtonGroup onCancelClick={handleEditClick} />}
          </>
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
