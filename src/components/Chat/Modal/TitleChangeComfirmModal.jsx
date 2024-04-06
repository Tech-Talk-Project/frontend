import React from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
} from "@material-tailwind/react";
import { queryClient } from "../../../apis/queryClient";
import { CHAT_QUERY_KEYS } from "../../../constants/queryKeys";
import { useForm } from "react-hook-form";
import { changeRoomTitle } from "../../../apis/chat";
import { INPUT_VALIDATION } from "../../../constants/validation";
import InputError from "../../Common/InputError";

export default function TitleChangeComfirmModal({
  isOpen,
  setIsOpen,
  chatRoomId,
  title,
  onTitleChangeClick,
}) {
  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
    },
  });

  const changeTitleMutate = useMutation({
    mutationFn: ({ title }) => changeRoomTitle({ chatRoomId, newTitle: title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHAT_QUERY_KEYS.chatList });
      queryClient.invalidateQueries({
        queryKey: CHAT_QUERY_KEYS.chatData(chatRoomId),
      });
      reset({ title: "" });
      setIsOpen();
    },
  });
  const onSubmit = ({ title }) => {
    if (!isValid) {
      setFocus("title");
      return;
    }

    changeTitleMutate.mutate({ title });
  };
  return (
    <Dialog open={isOpen} handler={setIsOpen}>
      <DialogHeader className="justify-center">
        <Typography variant="h4">채팅방 제목</Typography>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogBody>
          <Input
            type="text"
            className="font-semibold !text-base !border-blue-gray-300 focus:!border-black"
            placeholder={title}
            labelProps={{
              className: "hidden",
            }}
            containerProps={{
              className: "min-w-0 h-9 bg-white rounded-[7px]",
            }}
            {...register("title", INPUT_VALIDATION.chatRoom)}
          />
          {errors.title ? (
            <InputError message={errors.title.message} />
          ) : (
            <Typography variant="small" className="mt-2 font-normal">
              채팅방 제목을 입력하지 않으면 기존 채팅방 제목으로 설정됩니다.
            </Typography>
          )}
        </DialogBody>
        <DialogFooter>
          <div>
            <Button
              variant="text"
              onClick={onTitleChangeClick}
              ripple={false}
              className="mr-1 text-sm"
            >
              취소
            </Button>
            <Button type="submit" ripple={false} className="bg-brand text-sm">
              변경하기
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
