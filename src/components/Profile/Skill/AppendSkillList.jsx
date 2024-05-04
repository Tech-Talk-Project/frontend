import React, { forwardRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { CATEGORIES } from "../../../constants/category";
import SkillCard from "./SkillCard";

const AppendSkillList = forwardRef(function AppendSkillList(
  { skills, addSkill },
  ref
) {
  const skillList = skills.map((skill) => skill.skill);
  const handleClick = (language) => {
    addSkill({ skill: language });
  };
  return (
    <ul
      ref={ref}
      className="absolute w-full max-h-80 overflow-auto rounded-md bg-black border border-line z-30"
    >
      {Object.entries(CATEGORIES).map((category) => (
        <SkillCard
          key={uuidv4()}
          category={category[0]}
          languages={category[1]}
          skillList={skillList}
          onClick={handleClick}
        />
      ))}
    </ul>
  );
});

export default AppendSkillList;
