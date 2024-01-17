import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Typography, Input } from "@material-tailwind/react";
import { MdEdit } from "react-icons/md";
import Button from "../Common/Button";
import ButtonGroup from "./ButtonGroup";
import { INPUT_VALIDATION } from "../../constants/validation";
import InputError from "../Common/InputError";
import useProfiles from "../../hooks/useProfiles";

export default function Information({ info: { name, job, email } }) {
  const [isEditing, setIsEditing] = useState(false);
  const { setProfileInfoMutate } = useProfiles();
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name,
      job,
    },
  });

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };
  const handleCancelClick = () => {
    reset({ name, job });
    handleEditClick();
  };
  const onSubmit = ({ name, job }) => {
    if (!isValid) {
      setFocus("name");
      return;
    }

    setProfileInfoMutate.mutate(
      { name: name.trim(), job: job.trim() },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  useEffect(() => {
    if (isEditing) {
      setFocus("name");
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
        className={`flex flex-col gap-5 p-4 w-full border border-black border-b-blue-gray-800 duration-150 peer-hover:border-brand peer-hover:rounded-md ${
          isEditing ? "rounded-md !border-brand" : ""
        }`}
      >
        <div className="flex items-center font-semibold">
          <span className="mr-4 shrink-0">Name : </span>
          {isEditing ? (
            <div className="relative">
              <Input
                type="text"
                className="border-none font-semibold"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{
                  className: "bg-white min-w-fit rounded-[7px] h-8",
                }}
                {...register("name", INPUT_VALIDATION.name)}
              />
              {errors.name && <InputError message={errors.name.message} />}
            </div>
          ) : (
            <span className="ml-4">{name}</span>
          )}
        </div>
        <div className="flex items-center font-semibold">
          <span className="mr-4 shrink-0">Job : </span>
          {isEditing ? (
            <div className="relative">
              <Input
                type="text"
                className="border-none font-semibold"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{
                  className: "bg-white min-w-fit rounded-[7px] h-8",
                }}
                {...register("job", INPUT_VALIDATION.job)}
              />
              {errors.job && <InputError message={errors.job.message} />}
            </div>
          ) : job ? (
            <span className="ml-4">{job}</span>
          ) : (
            <span className="ml-4 font-normal text-gray-600">
              직업을 입력해보세요.
            </span>
          )}
        </div>
        <Typography variant="h6">
          Email : <span className="ml-4">{email}</span>
        </Typography>
        {isEditing && <ButtonGroup onCancelClick={handleCancelClick} />}
      </form>
    </article>
  );
}
