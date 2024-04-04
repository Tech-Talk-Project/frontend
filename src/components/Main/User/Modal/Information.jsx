import { Typography } from "@material-tailwind/react";
import React from "react";

export default function Information({ info: { job, name, email } }) {
  return (
    <article className="md:px-4 w-full">
      <Typography variant="h6">{`Name: ${name}`}</Typography>
      {job && <Typography variant="h6">{`Job: ${job}`}</Typography>}
      <Typography variant="h6">{`Email: ${email}`}</Typography>
    </article>
  );
}
