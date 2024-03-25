import React from "react";
import Button from "../../Common/Button";

export default function ButtonGroup({ onCancelClick }) {
  return (
    <div className="flex justify-between gap-2 mt-2">
      <Button
        className="py-[6px] w-full text-sm font-semibold hover:bg-white hover:text-black duration-150"
        onClick={onCancelClick}
      >
        취소
      </Button>
      <Button
        type="submit"
        className="py-[6px] w-full bg-brand text-white text-sm font-semibold hover:bg-white hover:text-brand duration-150"
      >
        저장
      </Button>
    </div>
  );
}
