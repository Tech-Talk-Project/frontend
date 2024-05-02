import React from "react";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
import Logo from "../components/Common/Image/Logo";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1, { replace: true });
  };
  return (
    <main className="flex flex-col justify-center items-center gap-8 w-screen h-screen">
      <Logo size="lg" />
      <Typography variant="h1" className="font-extrabold text-8xl">
        Not Found
      </Typography>
      <Typography variant="h3" className="font-extrabold text-6xl">
        404
      </Typography>
      <Button
        onClick={handleClick}
        className="text-base bg-brand hover:bg-white hover:text-brand"
      >
        돌아가기
      </Button>
    </main>
  );
}
