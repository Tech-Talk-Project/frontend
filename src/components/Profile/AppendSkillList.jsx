import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  List,
  ListItem,
  Card,
  ListItemPrefix,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { CATEGORIES, CATEGORYS_PATH } from "../../constants/category";

export default function AppendSkillList({ skills, addSkill }) {
  const handleClick = (language) => {
    addSkill({ skill: language.title });
  };
  return (
    <ul className="absolute top-12 left-0 my-2 w-full max-h-80 overflow-auto rounded-md bg-black border border-line">
      {Object.entries(CATEGORIES).map((category) => (
        <li key={uuidv4()}>
          <Card className="text-center bg-black rounded-none">
            <Typography variant="h6" className="py-2 font-extrabold text-brand">
              {category[0].toUpperCase()}
            </Typography>
            <List className="grid grid-cols-3">
              {category[1].map((language) => (
                <ListItem
                  className="justify-center"
                  key={uuidv4()}
                  onClick={() => handleClick(language)}
                >
                  <ListItemPrefix>
                    <Avatar
                      variant="circular"
                      alt="candice"
                      size="sm"
                      src={CATEGORYS_PATH[language.fileName]}
                    />
                  </ListItemPrefix>
                  <Typography variant="h6">{language.title}</Typography>
                </ListItem>
              ))}
            </List>
          </Card>
        </li>
      ))}
    </ul>
  );
}
