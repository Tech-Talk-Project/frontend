import React from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import Button from "../../Common/Button";

export default function QuitModal({ isOpen, onOpenClick, onQuitClick }) {
  return (
    <Dialog open={isOpen} handler={onOpenClick} size="xs">
      <DialogBody className="flex flex-col items-center gap-1 text-center px-6 py-8">
        <Typography variant="h5" color="black">
          정말 회원을 탈퇴하시겠습니까?
        </Typography>
        <Typography>
          탈퇴 버튼 선택 시, 계정이 삭제되며 복구할 수 없습니다.
        </Typography>
      </DialogBody>
      <DialogFooter className="flex gap-2 pb-2 pt-0 px-4">
        <Button
          variant="text"
          onClick={onQuitClick}
          className="text-sm text-red-700"
        >
          탈퇴
        </Button>
        <Button onClick={onOpenClick} className="bg-brand text-sm">
          취소
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
