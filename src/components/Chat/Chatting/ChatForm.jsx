import React from "react";
import { Textarea } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { MdSend } from "@react-icons/all-files/md/MdSend";
import Button from "../../Common/Button";
import useBreakpoint from "../../../hooks/useBreakPoint";

export default function ChatForm({ sendMessage }) {
  const { isSmallMobile } = useBreakpoint();
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={handleKeyDown}
      className="relative flex items-start gap-2"
    >
      <Textarea
        rows={isSmallMobile ? 1 : 3}
        className="pl-4 pr-12 sm:px-3 !py-1 sm:py-2.5 min-h-full border-none font-semibold text-white !text-base"
        labelProps={{
          className: "hidden",
        }}
        containerProps={{
          className:
            "grid min-w-fit h-full bg-gray-900 border border-blue-gray-900 rounded-[7px] overflow-y-auto",
        }}
        {...register("chat")}
      />
      <Button
        type="submit"
        disabled={!isDirty || !isValid}
        className="absolute sm:relative right-1 -top-[0.2rem] sm:top-0 bottom-0 flex items-start my-auto sm:my-0 p-1 sm:py-2 sm:px-4 bg-transparent sm:bg-brand text-sm shrink-0 transition-none"
      >
        {isSmallMobile ? (
          <MdSend size={26} className="text-brand -rotate-45 " />
        ) : (
          <span className="text-white">전송</span>
        )}
      </Button>
    </form>
  );
}
