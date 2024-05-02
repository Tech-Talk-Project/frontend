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
      navigate(path, { replace: true });
    } else {
      onRetry();
    }
  };

  return (
    <article className="fixed top-0 bottom-0 right-0 left-0 m-auto flex flex-col items-center justify-center h-60 w-full max-w-sm border border-blue-gray-800 bg-black rounded-md z-30">
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
        className="mt-4 text-base text-black bg-white hover:bg-brand hover:text-white duration-150"
      >
        {buttonMessage}
      </Button>
    </article>
  );
}
