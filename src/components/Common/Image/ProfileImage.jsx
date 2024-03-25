import React from "react";
import defaultProfile from "../../../assets/images/profile/default_profile_img.png";

const SIZE = {
  sm: "w-9 h-9",
  md: "w-11 h-11",
  lg: "w-52 h-52",
};

export default function ProfileImage({ imageUrl, size }) {
  const onErrorImg = (e) => {
    e.target.src = defaultProfile;
  };

  return (
    <img
      src={imageUrl}
      alt={`${imageUrl ? "" : "기본 "}프로필 이미지`}
      className={`rounded-full ${SIZE[size]}`}
      onError={onErrorImg}
    />
  );
}
