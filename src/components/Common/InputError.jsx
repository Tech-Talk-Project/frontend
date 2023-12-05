import React from "react";

export default function InputError({ message }) {
  return (
    <p className="absolute -bottom-[18px] flex items-center mt-[2px] text-xs text-error">
      {message}
    </p>
  );
}
