import React from "react";
import { ListItem, Typography } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ProfileImage from "../../../Common/Image/ProfileImage";
import { inviteUserWithEmail } from "../../../../apis/user";

export default function SearchResultItem({
  memberData: { memberId, name, email, imageUrl },
  onDialogClose,
}) {
  const { chatRoomId } = useParams();
  const inviteMutate = useMutation({
    mutationFn: () => inviteUserWithEmail({ chatRoomId, memberId }),
    onSuccess: () => {
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
