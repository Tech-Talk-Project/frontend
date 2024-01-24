import React, { useEffect, useState } from "react";
import { Typography, Textarea } from "@material-tailwind/react";
import { MdEdit } from "react-icons/md";
import Button from "../../Common/Button";
import ButtonGroup from "../Common/ButtonGroup";
import { useForm } from "react-hook-form";
import useProfiles from "../../../hooks/useProfiles";
import InputError from "../../Common/InputError";
import { INPUT_VALIDATION } from "../../../constants/validation";

export default function Introduction({ introduction }) {
  const [isEditing, setIsEditing] = useState(false);
  const { setProfileIntroductionMutate } = useProfiles();
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      introduction,
    },
  });

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };
  const handleCancelClick = () => {
    reset({ introduction });
    handleEditClick();
  };
  const onSubmit = ({ introduction }) => {
    if (!isValid) {
      setFocus("introduction");
      return;
    }

    setProfileIntroductionMutate.mutate(
      { introduction: introduction.trim() },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  useEffect(() => {
    if (isEditing) {
      setFocus("introduction");
    }
  }, [isEditing, setFocus]);
  return (
    <article className="relative w-full">
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
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col gap-1 p-4 w-full border border-black border-b-blue-gray-800 duration-150 peer-hover:border-brand peer-hover:rounded-md ${
          isEditing ? "rounded-md !border-brand" : ""
        }`}
      >
        <Typography variant="h6">Introduction</Typography>
        {isEditing ? (
          <div className="relative mb-2">
            <Textarea
              placeholder="한 줄 소개글을 적어보세요."
              rows={3}
              className="border-none font-semibold"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{
                className: "min-w-fit bg-white rounded-[7px]",
              }}
              {...register("introduction", INPUT_VALIDATION.introduction)}
            />
            {errors.introduction && (
              <InputError message={errors.introduction.message} />
            )}
          </div>
        ) : (
          <Typography
            variant="paragraph"
            className={`font-normal ${introduction ? "" : "text-gray-600"}`}
          >
            {introduction ? introduction : "한 줄 소개글을 적어보세요."}
          </Typography>
        )}
        {isEditing && <ButtonGroup onCancelClick={handleCancelClick} />}
      </form>
    </article>
  );
}
