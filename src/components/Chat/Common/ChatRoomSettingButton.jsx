import React from "react";
import { MdOutlineMoreVert, MdExitToApp, MdSubtitles } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
} from "@material-tailwind/react";
import { changeRoomTitle, exitChatRoom } from "../../../apis/chat";
import { useRecoilValue } from "recoil";
import { memberIdState } from "../../../recoil/atoms/auth";
import useModal from "../../../hooks/useModal";
import InputError from "../../Common/InputError";
import { useForm } from "react-hook-form";
import { INPUT_VALIDATION } from "../../../constants/validation";
import { queryClient } from "../../../apis/queryClient";
import { CHAT_QUERY_KEYS } from "../../../constants/queryKeys";

export default function ChatRoomSettingButton({
  title,
  chatRoomId,
  ownerId,
  nowChatRoomId,
  setChatRooms,
}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useModal();
  const memberId = useRecoilValue(memberIdState);
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
  const chatRoomExitMutate = useMutation({
    mutationFn: () => exitChatRoom({ chatRoomId }),
    onSuccess: () => {
      if (chatRoomId === nowChatRoomId) {
        navigate("/chatList", { replace: true });
      }
      setChatRooms((prevChatRooms) =>
        prevChatRooms.filter((room) => room.chatRoomId !== chatRoomId)
      );
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

  const handleTitleChangeClick = (e) => {
    e.stopPropagation();
    setIsOpen();
  };
  const handleExitClick = (e) => {
    e.stopPropagation();
    chatRoomExitMutate.mutate({ chatRoomId });
  };
  const onSubmit = ({ title }) => {
    if (!isValid) {
      setFocus("title");
      return;
    }

    changeTitleMutate.mutate({ title });
  };
  return (
    <>
      <Menu placement="bottom-end">
        <MenuHandler>
          <Button
            ripple={false}
            variant="text"
            className="p-1 text-white hover:text-blue-gray-400 duration-150"
          >
            <MdOutlineMoreVert size={20} />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {ownerId === memberId && (
            <MenuItem
              className="flex items-center gap-2 p-2"
              onClick={handleTitleChangeClick}
            >
              <MdSubtitles size={20} />
              <Typography variant="h6">채팅방 이름 변경</Typography>
            </MenuItem>
          )}
          <MenuItem
            className="flex items-center gap-2 p-2 hover:!text-red-700"
            onClick={handleExitClick}
          >
            <MdExitToApp size={20} />
            <Typography variant="h6">나가기</Typography>
          </MenuItem>
        </MenuList>
      </Menu>
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
                onClick={setIsOpen}
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
    </>
  );
}
