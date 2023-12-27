import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@material-tailwind/react";
import { MdAdd } from "react-icons/md";
import SkillImage from "../Common/SkillImage";
import { CATEGORYS_PATH } from "../../constants/category";
import Button from "../Common/Button";
import ButtonGroup from "./ButtonGroup";
import AppendSkillList from "./AppendSkillList";
import useProfiles from "../../hooks/useProfiles";
import { useFieldArray, useForm } from "react-hook-form";

export default function Skills({ skills }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isShowSkillList, setIsShowSkillList] = useState(false);
  const { setProfileSkillsMutate } = useProfiles();
  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      skills: skills.map((skill) => ({ skill })),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };
  const handleSkillListClick = () => {
    setIsShowSkillList((prev) => !prev);
  };
  const handleCancelClick = () => {
    reset({ skills: skills.map((skill) => ({ skill })) });
    handleEditClick();
  };
  const onSubmit = ({ skills }) => {
    setProfileSkillsMutate.mutate(
      {
        skills: skills.map((skill) => skill.skill),
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };
  return (
    <article className="p-4 w-full border border-line rounded-md">
      <Typography variant="h5">Skills</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between py-2">
          {fields.length === 0 ? (
            <Typography
              variant="paragraph"
              className="font-normal text-gray-600"
            >
              자신이 가진 기술들을 추가해보세요.
            </Typography>
          ) : (
            <ul className="flex gap-3 mr-3 max-w-[480px] overflow-x-auto">
              {fields.map((field, index) => (
                <li key={field.id} className="shrink-0">
                  {
                    <SkillImage
                      size="lg"
                      language={field.skill}
                      imageUrl={CATEGORYS_PATH[field.skill]}
                      isEditing={isEditing}
                      index={index}
                      remove={remove}
                    />
                  }
                </li>
              ))}
            </ul>
          )}
          {!isEditing && (
            <Button
              className="p-[10px] rounded-full hover:bg-brand duration-150"
              onClick={handleEditClick}
            >
              <MdAdd size={28} />
            </Button>
          )}
        </div>
        {isEditing && (
          <div className="relative">
            <Button
              className={`mt-2 py-2 w-full text-md hover:bg-brand ${
                isShowSkillList ? "bg-brand" : ""
              }`}
              onClick={handleSkillListClick}
            >
              Languages
            </Button>
            {isShowSkillList && (
              <AppendSkillList skills={fields} addSkill={append} />
            )}
            <ButtonGroup onCancelClick={handleCancelClick} />
          </div>
        )}
      </form>
    </article>
  );
}
