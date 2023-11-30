import { Typography } from "@material-tailwind/react";
import React from "react";

export default function Information({ info: { name, job, email } }) {
  return (
    <article className="p-4 w-full border-b border-line">
      <Typography variant="h6">
        Name : <span className="ml-4">{name}</span>
      </Typography>
      <Typography variant="h6">
        Job : <span className="ml-4">{job}</span>
      </Typography>
      <Typography variant="h6">
        Email : <span className="ml-4">{email}</span>
      </Typography>
    </article>
  );
}
