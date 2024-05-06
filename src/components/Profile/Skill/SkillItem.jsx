import React from "react";
import { Typography, ListItem, ListItemPrefix } from "@material-tailwind/react";
import SkillImage from "../../Common/Image/SkillImage";

export default function SkillItem({ language, isSelected, onClick }) {
  return (
    <ListItem
      ripple={false}
      className={`justify-center text-blue-gray-50 ${
        isSelected
          ? "bg-blue-gray-50 text-black opacity-100 pointer-events-none cursor-not-allowed select-none"
          : ""
      }`}
      onClick={() => onClick(language)}
    >
      <ListItemPrefix className="shrink-0 mr-0 sm:mr-4">
        <SkillImage language={language} />
      </ListItemPrefix>
      <Typography variant="h6" className="hidden sm:block">
        {language}
      </Typography>
    </ListItem>
  );
}
