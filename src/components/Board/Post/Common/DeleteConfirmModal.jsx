import React from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import Button from "../../../Common/Button";

export default function DeleteConfirmModal({
  isOpen,
  setIsOpen,
  onDeleteClick,
}) {
  return (
    <Dialog open={isOpen} handler={setIsOpen}>
      <DialogBody className="flex flex-col items-center gap-1 text-center px-6 py-8">
        <Typography variant="h5" color="black">
          정말 게시글을 삭제하시겠습니까?
        </Typography>
        <Typography>
          확인 버튼 클릭 시, 게시글은 삭제되며 복구할 수 없습니다.
        </Typography>
      </DialogBody>
      <DialogFooter className="gap-2">
        <Button variant="text" onClick={setIsOpen}>
          취소
        </Button>
        <Button className="bg-brand" onClick={onDeleteClick}>
          확인
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
