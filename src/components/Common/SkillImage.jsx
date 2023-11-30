import React from "react";

const SIZE = {
  sm: "w-9 h-9",
  lg: "w-12 h-12",
};

export default function SkillImage({ language, imageUrl, size }) {
  return (
    <img
      src={imageUrl}
      alt={`${language} 로고 이미지`}
      className={`${SIZE[size]} rounded-full bg-white bg-opacity-30 overflow-hidden object-contain`}
    />
  );
}
