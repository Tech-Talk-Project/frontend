import { Typography } from "@material-tailwind/react";
import React from "react";

export default function NullUserGrid() {
  return (
    <div className="flex justify-center items-center h-full">
      <Typography variant="paragraph" className="font-normal text-gray-600">
        등록된 사용자가 없습니다.
      </Typography>
    </div>
  );
}
