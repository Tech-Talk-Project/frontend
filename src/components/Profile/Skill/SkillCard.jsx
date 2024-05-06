import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Typography, Card, List } from "@material-tailwind/react";
import SkillItem from "./SkillItem";

export default function SkillCard({ category, languages, skillList, onClick }) {
  return (
    <li>
      <Card className="text-center bg-black rounded-none">
        <Typography variant="h6" className="py-2 font-extrabold text-brand">
          {category.toUpperCase()}
        </Typography>
        <List className="grid grid-cols-3  min-w-0">
          {languages.map((language) => {
            const isSelected = skillList.includes(language);

            return (
              <SkillItem
                key={uuidv4()}
                language={language}
                isSelected={isSelected}
                onClick={onClick}
              />
            );
          })}
        </List>
      </Card>
    </li>
  );
}
