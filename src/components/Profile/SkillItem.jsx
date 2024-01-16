import React from "react";
import {
  Typography,
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { CATEGORYS_PATH } from "../../constants/category";
import SkillImage from "../Common/SkillImage";

export default function SkillItem({ language, isSelected, onClick }) {
  return (
    <ListItem
      ripple={false}
      className={`justify-center ${
        isSelected
          ? "bg-blue-gray-50 opacity-100 pointer-events-none cursor-not-allowed select-none"
          : ""
      }`}
      onClick={() => onClick(language)}
    >
      <ListItemPrefix className="shrink-0 mr-0 sm:mr-4">
        <SkillImage
          language={language.title}
          imageUrl={CATEGORYS_PATH[language.title]}
          size="sm"
        />
      </ListItemPrefix>
      <Typography variant="h6" className="hidden sm:block">
        {language.title}
      </Typography>
    </ListItem>
  );
}
