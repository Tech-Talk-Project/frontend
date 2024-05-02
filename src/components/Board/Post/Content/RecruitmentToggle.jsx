import React from "react";
import { Switch, Typography } from "@material-tailwind/react";

export default function RecruitmentToggle({ recruitmentActive, onClick }) {
  return (
    <article className="flex justify-end shrink-0">
      <Switch
        id="custom-switch-component"
        ripple={false}
        label={
          <Typography variant="h6" color="white">
            모집중
          </Typography>
        }
        checked={recruitmentActive}
        onChange={onClick}
        className="h-full w-full checked:bg-brand"
        containerProps={{
          className: "w-11 h-6",
        }}
        circleProps={{
          className: "before:hidden left-0.5 border-none",
        }}
      />
    </article>
  );
}
