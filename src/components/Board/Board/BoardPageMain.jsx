import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../Common/Button";

export default function BoardPageMain() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleCreateClick = () => {
    navigate(`/create/board?type=${searchParams.get("type")}`);
  };
  return (
    <div>
      <Button onClick={handleCreateClick}>글쓰기</Button>
    </div>
  );
}
