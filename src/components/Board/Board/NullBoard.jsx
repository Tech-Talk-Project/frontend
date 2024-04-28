import React from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { isLoggedInState } from "../../../recoil/atoms/auth";
import Button from "../../Common/Button";

export default function NullBoard({ onCreateClick }) {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInState);

  const handleCreateClick = () => {
    if (isLoggedIn) {
      onCreateClick();
    } else {
      navigate("/login");
    }
  };
  return (
    <article className="flex flex-col gap-8 justify-center items-center h-full">
      <Typography variant="h5" className="text-blue-gray-600">
        게시판이 비어있습니다. 게시글을 생성해보세요!
      </Typography>
      <Button
        onClick={handleCreateClick}
        className="bg-brand text-sm py-2 px-6"
      >
        글쓰기
      </Button>
    </article>
  );
}
