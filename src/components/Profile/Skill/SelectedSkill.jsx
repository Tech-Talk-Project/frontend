import React, { memo } from "react";
import SkillImage from "../../Common/Image/SkillImage";

const SelectedSkill = ({ skill, isEditing, index, removeSkill }) => {
  const handleClick = () => {
    if (!isEditing) return;

    removeSkill(index);
  };
  return (
    <li
      className={`relative ${
        isEditing ? "hover:opacity-60 cursor-pointer duration-150" : ""
      }`}
      onClick={handleClick}
    >
      <SkillImage language={skill} />
    </li>
  );
};

export default memo(SelectedSkill);
