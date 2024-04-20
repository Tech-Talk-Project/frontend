import React from "react";
import { Input } from "@material-tailwind/react";
import { INPUT_VALIDATION } from "../../../constants/validation";
import InputError from "../../Common/InputError";

export default function Title({ register, onTitleSubmit, errors }) {
  return (
    <form className="relative flex w-full" onSubmit={onTitleSubmit}>
      <Input
        type="text"
        className="pl-0 border-none font-semibold !text-2xl text-white placeholder:text-blue-gray-800"
        placeholder="제목에 핵심 내용을 요약해보세요."
        labelProps={{
          className: "hidden",
        }}
        containerProps={{
          className: "min-w-fit rounded-[7px] h-8",
        }}
        {...register("title", INPUT_VALIDATION.boardTitle)}
      />
      {errors.title && (
        <InputError
          message={errors.title.message}
          size="md"
          className="-bottom-[1.5rem]"
        />
      )}
    </form>
  );
}
