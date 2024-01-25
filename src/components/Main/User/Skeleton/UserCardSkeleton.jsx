import React from "react";
import {
  Typography,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

export default function UserCardSkeleton() {
  return (
    <Card className="animate-pulse bg-dark_gray shadow-sm shadow-blue-gray-500">
      <CardBody className="flex justify-between items-center">
        <Typography
          as="div"
          variant="h1"
          className="h-6 w-28 rounded-md bg-blue-gray-800"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="h-10 w-10 rounded-full bg-blue-gray-800"
        >
          &nbsp;
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-10 w-full rounded-md bg-blue-gray-800"
        >
          &nbsp;
        </Typography>
      </CardFooter>
    </Card>
  );
}
