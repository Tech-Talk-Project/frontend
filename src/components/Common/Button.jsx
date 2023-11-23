import React from "react";
import { Button as TailwindButton } from "@material-tailwind/react";

export default function Button({ children, className, onClick }) {
  return (
    <TailwindButton
      ripple={false}
      className={`${className} focus:!opacity-100 active:opacity-100 normal-case font-inter`}
      onClick={onClick}
    >
      {children}
    </TailwindButton>
  );
}
