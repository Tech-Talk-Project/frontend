import React from "react";
import SkillImage from "../../Common/Image/SkillImage";

export default function SkillItem({ skill }) {
  return (
    <li>
      <SkillImage language={skill} />
    </li>
  );
}
