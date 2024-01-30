import { Spinner } from "@material-tailwind/react";
import React from "react";

export default function Loader() {
  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center w-full h-full">
      <Spinner className="w-9 h-9 text-brand" />
    </div>
  );
}
