import React, { useEffect, useRef, useState } from "react";
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
  const skillListRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSkillListOpen, setIsSkillListOpen] = useState(false);
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
    setIsSkillListOpen((prev) => !prev);
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

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (skillListRef.current && !skillListRef.current.contains(e.target)) {
        setIsSkillListOpen(false);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);

    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [skillListRef]);
  return (
    <article className="p-4 w-full border border-line rounded-md">
      <Typography variant="h5">Skills</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between gap-2 py-2">
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
                isSkillListOpen ? "bg-brand" : ""
              }`}
              onClick={handleSkillListClick}
            >
              Languages
            </Button>
            {isSkillListOpen && (
              <AppendSkillList
                skills={fields}
                addSkill={append}
                ref={skillListRef}
              />
            )}
            <ButtonGroup onCancelClick={handleCancelClick} />
          </div>
        )}
      </form>
    </article>
  );
}
