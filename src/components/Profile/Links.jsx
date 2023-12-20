import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { MdEdit } from "react-icons/md";
import Button from "../Common/Button";
import Link from "./Link";
import { useFieldArray, useForm } from "react-hook-form";
import ButtonGroup from "./ButtonGroup";
import LinkAppendInput from "./LinkAppendInput";
import useProfiles from "../../hooks/useProfiles";

export default function Links({ links }) {
  const [isEditing, setIsEditing] = useState(false);
  const { setProfileLinksMutate } = useProfiles();
  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      links: links.map((link) => ({ link })),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };
  const handleCancelClick = () => {
    reset({ links: links.map((link) => ({ link })) });
    handleEditClick();
  };
  const onSubmit = ({ links }) => {
    setProfileLinksMutate.mutate(
      {
        links: links.map((link) => link.link),
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };
  return (
    <article className="relative w-full">
      {!isEditing && (
        <Button
          variant="text"
          className="absolute top-1 right-1 p-1 text-base_gray hover:text-brand duration-150 peer"
          onClick={handleEditClick}
        >
          <MdEdit size={20} />
        </Button>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col gap-1 p-4 w-full border border-black border-b-line duration-150 peer-hover:border-brand peer-hover:rounded-md ${
          isEditing ? "rounded-md !border-brand" : ""
        }`}
      >
        <Typography variant="h6">Links</Typography>
        {fields.length === 0 ? (
          <Typography variant="paragraph" className="font-normal text-gray-600">
            자신을 소개할 수 있는 링크를 추가해보세요.
          </Typography>
        ) : (
          <ul className="flex flex-col gap-2">
            {fields.map((field, index) => (
              <Link
                key={field.id}
                link={field.link}
                isEditing={isEditing}
                index={index}
                remove={remove}
              />
            ))}
          </ul>
        )}
        {isEditing && (
          <>
            <LinkAppendInput addLink={append} isEditing={isEditing} />
            <ButtonGroup onCancelClick={handleCancelClick} />
          </>
        )}
      </form>
    </article>
  );
}
