import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import InputError from "./InputError";
import { INPUT_VALIDATION } from "../../constants/validation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import newChatMemberInfoState from "../../recoil/selectors/newChatMemberIdList";
import { createChatRoom } from "../../apis/chat";
import newChatMemberState from "../../recoil/atoms/newChatMember";
import createNewChatState from "../../recoil/atoms/createNewChat";

export default function NewChatTitleModal({ isOpen, onClick }) {
  const navigate = useNavigate();
  const setNewChatMembers = useSetRecoilState(newChatMemberState);
  const setCreateNewChat = useSetRecoilState(createNewChatState);
  const { newChatMembersIdList, newChatMembersNameList } = useRecoilValue(
    newChatMemberInfoState
  );
  const createChatRoomMutate = useMutation({
    mutationFn: createChatRoom,
    onSuccess: () => {
      navigate("/chatList");
      setNewChatMembers([]);
      setCreateNewChat(false);
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
    },
  });

  const handleCancelClick = () => {
    reset({ title: "" });
    onClick();
  };
  const onSubmit = ({ title }) => {
    if (!isValid) {
      setFocus("title");
      return;
    }

    createChatRoomMutate.mutate({
      title:
        title.length === 0 ? newChatMembersNameList.join(", ") : title.trim(),
      memberIds: newChatMembersIdList,
    });
  };

  return (
    <Dialog open={isOpen} handler={onClick}>
      <DialogHeader className="justify-center">
        <Typography variant="h4">채팅방 제목</Typography>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogBody>
          <Input
            type="text"
            className="font-semibold !text-base !border-blue-gray-300 focus:!border-black"
            placeholder={newChatMembersNameList.join(", ")}
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
              채팅방 제목을 입력하지 않으면 유저 닉네임으로 채팅방 제목이
              설정됩니다.
            </Typography>
          )}
        </DialogBody>
        <DialogFooter>
          <div>
            <Button
              variant="text"
              onClick={handleCancelClick}
              ripple={false}
              className="mr-1 text-sm"
            >
              취소
            </Button>
            <Button type="submit" ripple={false} className="bg-brand text-sm">
              채팅하기
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
