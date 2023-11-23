import React from "react";
import Button from "./Button";

export default function OauthLoginButton({
  type: { title, redirect_url, color, logo },
}) {
  const handleClick = () => {
    window.location.href = redirect_url;
  };

  return (
    <Button
      className={`flex items-center justify-between py-[10px] w-60 ${color} text-lg`}
      onClick={handleClick}
    >
      {logo}
      <span>Login with {title}</span>
    </Button>
  );
}
