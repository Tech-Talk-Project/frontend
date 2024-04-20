import { Input } from "@material-tailwind/react";
import React from "react";
import { INPUT_VALIDATION } from "../../../constants/validation";
import InputError from "../../Common/InputError";
import TagList from "./TagList";

export default function Tag({ tags, setTags, register, errors, onSubmit }) {
  return (
    <article
      className={`flex items-center flex-wrap ${
        tags.length !== 0 ? "gap-4" : ""
      }`}
    >
      <TagList tags={tags} setTags={setTags} />
      {tags.length < 10 && (
        <form className="flex max-w-xs w-full" onSubmit={onSubmit}>
          <div className="relative w-full">
            <Input
              type="text"
              className="pl-0 border-none font-semibold !text-base text-white placeholder:text-blue-gray-800"
              placeholder="태그를 설정하세요.(최대 10개)"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{
                className: "min-w-fit rounded-[7px] h-8",
              }}
              {...register("tag", INPUT_VALIDATION.tag)}
            />
            {errors.tag && <InputError message={errors.tag.message} />}
          </div>
        </form>
      )}
    </article>
  );
}
