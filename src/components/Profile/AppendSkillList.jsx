import React, { forwardRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  List,
  ListItem,
  Card,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { CATEGORIES, CATEGORYS_PATH } from "../../constants/category";
import SkillImage from "../Common/SkillImage";

const AppendSkillList = forwardRef(function AppendSkillList(
  { skills, addSkill },
  ref
) {
  const skillList = skills.map((skill) => skill.skill);
  const handleClick = (language) => {
    addSkill({ skill: language.title });
  };
  return (
    <ul
      ref={ref}
      className="absolute top-12 left-0 my-2 w-full max-h-80 overflow-auto rounded-md bg-black border border-line z-30"
    >
      {Object.entries(CATEGORIES).map((category) => (
        <li key={uuidv4()}>
          <Card className="text-center bg-black rounded-none">
            <Typography variant="h6" className="py-2 font-extrabold text-brand">
              {category[0].toUpperCase()}
            </Typography>
            <List className="grid grid-cols-3">
              {category[1].map((language) => {
                const isSelected = skillList.includes(language.title);

                return (
                  <ListItem
                    ripple={false}
                    className={`justify-center ${
                      isSelected
                        ? "bg-blue-gray-50 opacity-100 pointer-events-none cursor-not-allowed select-none"
                        : ""
                    }`}
                    key={uuidv4()}
                    onClick={() => handleClick(language)}
                  >
                    <ListItemPrefix>
                      <SkillImage
                        language={language.title}
                        imageUrl={CATEGORYS_PATH[language.title]}
                        size="sm"
                      />
                    </ListItemPrefix>
                    <Typography variant="h6">{language.title}</Typography>
                  </ListItem>
                );
              })}
            </List>
          </Card>
        </li>
      ))}
    </ul>
  );
});

export default AppendSkillList;
