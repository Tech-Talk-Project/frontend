import React from "react";
import { Button as TailwindButton } from "@material-tailwind/react";

export default function Button({ children, className, onClick, ...options }) {
  return (
    <TailwindButton
      ripple={false}
      {...options}
      className={`${className} focus:!opacity-100 active:opacity-100 normal-case`}
      onClick={onClick}
    >
      {children}
    </TailwindButton>
  );
}
