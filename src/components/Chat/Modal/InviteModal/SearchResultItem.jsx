import React from "react";
import { ListItem, Typography } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ProfileImage from "../../../Common/Image/ProfileImage";
import { inviteUserWithEmail } from "../../../../apis/chat";
import useToast from "../../../../hooks/useToast";
import useNewChatMember from "../../../../hooks/useNewChatMemberClick";
import { useRecoilValue } from "recoil";
import { memberIdState } from "../../../../recoil/atoms/auth";

export default function SearchResultItem({
  color,
  memberData: { memberId: searchedMemberId, name, email, imageUrl },
  onDialogClose,
}) {
  const { chatRoomId } = useParams();
  const memberId = useRecoilValue(memberIdState);
  const { showToast } = useToast();
  const handleMemberClick = useNewChatMember(searchedMemberId, name, imageUrl);
  const inviteMutate = useMutation({
    mutationFn: () =>
      inviteUserWithEmail({ chatRoomId, memberId: searchedMemberId }),
    onError: (error) => {
      const status = error?.response?.status;
      if (status === 409) {
        showToast("이미 채팅방에 존재하는 유저입니다.");
      }
    },
    onSettled: () => {
      onDialogClose();
    },
  });

  const handleClick = () => {
    if (memberId === searchedMemberId) {
      onDialogClose();
      showToast("본인은 추가할 수 없습니다.");
      return;
    }

    if (color === "black") {
      handleMemberClick();
      onDialogClose();
      return;
    }
    inviteMutate.mutate({ chatRoomId, memberId: searchedMemberId });
  };
  return (
    <ListItem
      className={`gap-3 ${
        color === "black" ? "text-white hover:text-blue-gray-900" : ""
      }`}
      onClick={handleClick}
    >
      <ProfileImage size="sm" imageUrl={imageUrl} />
      <div>
        <Typography variant="h6">{name}</Typography>
        <Typography>{email}</Typography>
      </div>
    </ListItem>
  );
}
