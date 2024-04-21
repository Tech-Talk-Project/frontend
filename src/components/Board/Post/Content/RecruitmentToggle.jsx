import { Switch, Typography } from "@material-tailwind/react";
import React from "react";

export default function RecruitmentToggle({ recruitmentActive }) {
  return (
    <article>
      <Switch
        id="custom-switch-component"
        ripple={false}
        label={
          <Typography variant="h6" color="white">
            모집중
          </Typography>
        }
        checked={recruitmentActive}
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
