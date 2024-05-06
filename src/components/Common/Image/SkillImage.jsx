import React from "react";
import { languageSVG } from "../../../assets/images/language";

export default function SkillImage({ language }) {
  const { borderColor, image } = languageSVG[language.toLowerCase()];

  return (
    <article className={`rounded-full border ${borderColor} overflow-hidden`}>
      {image}
    </article>
  );
}
