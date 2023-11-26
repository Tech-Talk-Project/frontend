import React from "react";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Logo from "../Common/Logo";
import Button from "../Common/Button";

export default function ErrorMessage({ title, content, buttonMessage, path }) {
  const navigate = useNavigate();

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
        onClick={() => navigate(path)}
        className="text-base text-black bg-white hover:bg-brand hover:text-white duration-150"
      >
        {buttonMessage}
      </Button>
    </>
  );
}
