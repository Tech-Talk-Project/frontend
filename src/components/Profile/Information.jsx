import React from "react";
import { Typography } from "@material-tailwind/react";
import { MdEdit } from "react-icons/md";
import Button from "../Common/Button";

export default function Information({ info: { name, job, email } }) {
  return (
    <article className="relative">
      <Button
        variant="text"
        className="absolute top-1 right-1 p-1 text-base_gray hover:text-brand duration-150 peer"
      >
        <MdEdit size={20} />
      </Button>
      <div className="p-4 w-full border border-black border-b-line duration-150 peer-hover:border-brand peer-hover:rounded-md">
        <Typography variant="h6">
          Name : <span className="ml-4">{name}</span>
        </Typography>
        <Typography variant="h6">
          Job : <span className="ml-4">{job}</span>
        </Typography>
        <Typography variant="h6">
          Email : <span className="ml-4">{email}</span>
        </Typography>
      </div>
    </article>
  );
}
