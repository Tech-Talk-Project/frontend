import React from "react";

const text_size = {
  xs: "text-xs",
  md: "text-md",
  lg: "text-lg",
};

export default function InputError({ message, size = "xs", className }) {
  return (
    <p
      className={`absolute -bottom-[18px] flex items-center mt-[2px] ${text_size[size]} text-error ${className}`}
    >
      {message}
    </p>
  );
}
