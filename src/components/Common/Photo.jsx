import React from "react";
import defaultProfile from "../../assets/images/profile/default_profile_img.png";

const SIZE = {
  profile: "w-60 h-60",
  sm: "w-9 h-9",
  md: "w-10 h-10",
};

export default function Photo({ imageUrl, size }) {
  return (
    <picture
      className={`relative ${SIZE[size]} rounded-full bg-dark_gray overflow-hidden object-contain`}
    >
      <source srcSet={imageUrl} className="w-full h-full" />
      <img
        src={defaultProfile}
        alt="기본 프로필 이미지"
        className="absolute inset-0 m-auto w-3/5 h-3/5"
      />
    </picture>
  );
}
