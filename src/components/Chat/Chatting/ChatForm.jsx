import React from "react";
import { Textarea } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Button from "../../Common/Button";

export default function ChatForm({ sendMessage }) {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isDirty, isValid },
  } = useForm({
    defaultValues: {
      chat: "",
    },
  });

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      e.nativeEvent.isComposing === false
    ) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };
  const onSubmit = ({ chat }) => {
    setFocus("chat");
    if (!chat.trim()) return;

    sendMessage(chat);
    reset({ chat: "" });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
      <Textarea
        placeholder=""
        rows={3}
        className="border-none font-semibold"
        labelProps={{
          className: "hidden",
        }}
        containerProps={{
          className: "min-w-fit bg-white rounded-[7px]",
        }}
        {...register("chat")}
      />
      <Button type="submit" disabled={!isDirty || !isValid}>
        전송
      </Button>
    </form>
  );
}
