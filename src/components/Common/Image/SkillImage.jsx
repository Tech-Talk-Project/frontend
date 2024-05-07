import React from "react";
import { languageSVG } from "../../../assets/images/language";

export default function SkillImage({ language }) {
  const languageIcon = languageSVG[language.toLowerCase()];

  return (
    <article
      className={`rounded-full border ${
        languageIcon?.borderColor || ""
      } overflow-hidden`}
    >
      {languageIcon?.image}
    </article>
  );
}
