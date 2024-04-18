import React from "react";
import { ListItem, Typography } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import ProfileImage from "../../../Common/Image/ProfileImage";
import { inviteUserWithEmail } from "../../../../apis/chat";
import { toastState } from "../../../../recoil/atoms/toast";

export default function SearchResultItem({
  memberData: { memberId, name, email, imageUrl },
  onDialogClose,
}) {
  const { chatRoomId } = useParams();
  const setToast = useSetRecoilState(toastState);
  const inviteMutate = useMutation({
    mutationFn: () => inviteUserWithEmail({ chatRoomId, memberId }),
    onError: (error) => {
      const status = error?.response?.status;
      if (status === 409) {
        setToast({
          isOpen: true,
          message: "이미 채팅방에 존재하는 유저입니다.",
        });
        setTimeout(() => {
          setToast({ isOpen: false, message: "" });
        }, 3000);
      }
    },
    onSettled: () => {
      onDialogClose();
    },
  });

  const handleClick = () => {
    inviteMutate.mutate({ chatRoomId, memberId });
  };
  return (
    <ListItem className="gap-3" onClick={handleClick}>
      <ProfileImage size="sm" imageUrl={imageUrl} />
      <div>
        <Typography variant="h6">{name}</Typography>
        <Typography>{email}</Typography>
      </div>
    </ListItem>
  );
}
