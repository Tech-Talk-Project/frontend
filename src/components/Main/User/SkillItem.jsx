import React from "react";
import SkillImage from "../../Common/Image/SkillImage";
import { CATEGORYS_PATH } from "../../../constants/category";

export default function SkillItem({ skill }) {
  return (
    <li>
      <SkillImage language={skill} imageUrl={CATEGORYS_PATH[skill]} size="md" />
    </li>
  );
}
