import React from "react";
import { Typography } from "@material-tailwind/react";

export default function DividerWithText({ children }) {
  return (
    <div className="relative w-full my-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-line" />
      </div>
      <div className="relative flex justify-center leading-6">
        <Typography variant="h6" className="px-2 bg-black text-gray-500">
          {children}
        </Typography>
      </div>
    </div>
  );
}
