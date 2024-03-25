import React from "react";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Logo from "../Common/Image/Logo";
import Button from "../Common/Button";

export default function ErrorMessage({
  title,
  content,
  buttonMessage,
  path,
  onRetry,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      navigate(path);
    } else {
      onRetry();
    }
  };

  return (
    <>
      <Logo size="lg" />
      <section className="text-center mt-8 w-60">
        <Typography variant="h6" className="mx-[-100%] whitespace-nowrap">
          {title}
        </Typography>
        {content && (
          <Typography variant="h6" className="mx-[-100%] whitespace-nowrap">
            {content}
          </Typography>
        )}
      </section>
      <Button
        onClick={handleClick}
        className="text-base text-black bg-white hover:bg-brand hover:text-white duration-150"
      >
        {buttonMessage}
      </Button>
    </>
  );
}
