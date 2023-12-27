import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@material-tailwind/react";
import { MdAdd } from "react-icons/md";
import SkillImage from "../Common/SkillImage";
import { CATEGORYS_PATH } from "../../constants/category";
import Button from "../Common/Button";
import ButtonGroup from "./ButtonGroup";
import AppendSkillList from "./AppendSkillList";

export default function Skills({ skills }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isShowSkillList, setIsShowSkillList] = useState(false);

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };
  const handleSkillListClick = () => {
    setIsShowSkillList((prev) => !prev);
  };
  const handleCancelClick = () => {
    // reset({ links: links.map((link) => ({ link })) });
    handleEditClick();
  };
  return (
    <article className="p-4 w-full border border-line rounded-md">
      <Typography variant="h5">Skills</Typography>
      <div className="flex items-center justify-between py-2">
        <ul className="flex gap-3 mr-3 max-w-[480px] overflow-x-auto">
          {skills.map((skill) => (
            <li key={uuidv4()} className="shrink-0">
              {
                <SkillImage
                  size="lg"
                  language={skill}
                  imageUrl={CATEGORYS_PATH[skill]}
                />
              }
            </li>
          ))}
        </ul>
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
          {isShowSkillList && <AppendSkillList />}
          <ButtonGroup onCancelClick={handleCancelClick} />
        </div>
      )}
    </article>
  );
}
