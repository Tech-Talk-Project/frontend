import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Card,
  List,
  ListItem,
} from "@material-tailwind/react";
import { useForm, useWatch } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { USERS_QUERY_KEYS } from "../../../constants/queryKeys";
import { searchWithEmail } from "../../../apis/user";
import useDebounce from "../../../hooks/useDebounce";

export default function InviteModal({ isOpen, setIsOpen }) {
  const { register, handleSubmit, reset, getValues, control } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const emailValue = useWatch({
    control,
    name: "email",
  });
  const debouncedValue = useDebounce(emailValue, 700);
  const {
    data: { data: searchData },
    refetch,
  } = useQuery({
    queryKey: USERS_QUERY_KEYS.searchWithEmail(debouncedValue),
    queryFn: () => searchWithEmail({ email: debouncedValue }),
    enabled: !!debouncedValue,
  });

  const handleCancelClick = () => {
    setIsOpen();
    reset({ email: "" });
  };
  const handleDialogClose = () => {
    setIsOpen();
    reset({ email: "" });
  };

  useEffect(() => {
    if (!debouncedValue) return;

    refetch();
  }, [debouncedValue, refetch, getValues]);
  return (
    <Dialog open={isOpen} handler={handleDialogClose}>
      <DialogHeader className="justify-center">
        <Typography variant="h4">이메일 검색</Typography>
      </DialogHeader>
      <form onSubmit={handleSubmit(refetch)}>
        <DialogBody className="px-8 h-72">
          <Input
            type="search"
            className="font-semibold !text-base !border-blue-gray-300 focus:!border-black"
            placeholder="유저의 이메일을 검색해 보세요."
            labelProps={{
              className: "hidden",
            }}
            containerProps={{
              className: "min-w-0 h-9 bg-white rounded-[7px]",
            }}
            {...register("email")}
          />
          {searchData.length === 0 ? (
            <Typography className=" px-3 pt-2">
              "{getValues().email}"로 검색된 결과가 존재하지 않습니다.
            </Typography>
          ) : (
            <Card className="w-full max-h-60 overflow-auto">
              <List>
                {searchData.map((member) => (
                  <ListItem key={uuidv4()}>{member.name}</ListItem>
                ))}
              </List>
            </Card>
          )}
        </DialogBody>
        <DialogFooter>
          <div>
            <Button
              onClick={handleCancelClick}
              ripple={false}
              className="mr-1 bg-brand text-sm"
            >
              취소
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
