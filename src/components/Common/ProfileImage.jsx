import React from "react";
import defaultProfile from "../../assets/images/profile/default_profile_img.png";

const SIZE = {
  sm: "w-9 h-9",
  lg: "w-52 h-52",
};

export default function ProfileImage({ imageUrl, size }) {
  return (
    <picture
      className={`relative ${SIZE[size]} rounded-full bg-dark_gray overflow-hidden`}
    >
      <source srcSet={imageUrl} />
      <img
        src={defaultProfile}
        alt={`${imageUrl ? "" : "기본 "}프로필 이미지`}
        className={`absolute inset-0 m-auto ${
          imageUrl ? "w-full h-full object-cover" : "w-3/5 h-3/5 object-contain"
        }`}
      />
    </picture>
  );
}
