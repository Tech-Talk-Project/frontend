import React from "react";
import { useRecoilValue } from "recoil";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../Common/Button";
import { isLoggedInState } from "../../../recoil/atoms/auth";

export default function BoardPageMain() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLoggedIn = useRecoilValue(isLoggedInState);

  const handleCreateClick = () => {
    navigate(`/create/board?type=${searchParams.get("type")}`);
  };
  return (
    <div>
      {isLoggedIn && <Button onClick={handleCreateClick}>글쓰기</Button>}
    </div>
  );
}
