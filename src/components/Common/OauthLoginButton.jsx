import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function OauthLoginButton({
  type: { title, redirect_url, color, logo },
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    window.location.href = redirect_url;
  };
  const handleGoogleLogin = useGoogleLogin({
    scope: "email profile",
    flow: "auth-code",
    redirect_uri: redirect_url,
    ux_mode: "redirect",
    onSuccess: (codeResponse) => {
      navigate(`/oauth2/callback/google?code=${codeResponse.code}`);
    },
  });

  return (
    <Button
      className={`flex items-center justify-between py-[10px] w-60 ${color} text-lg`}
      onClick={title === "Google" ? handleGoogleLogin : handleClick}
    >
      {logo}
      <span className={title === "Github" ? "" : "text-black"}>
        Login with {title}
      </span>
    </Button>
  );
}
