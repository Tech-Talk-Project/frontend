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
  title,
  content,
}) {
  return (
    <Dialog open={isOpen} handler={setIsOpen}>
      <DialogBody className="flex flex-col items-center gap-1 text-center px-6 py-8">
        <Typography variant="h5" color="black">
          {title}
        </Typography>
        <Typography>{content}</Typography>
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
