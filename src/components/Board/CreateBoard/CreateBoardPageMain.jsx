import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomEditor from "ckeditor5-custom-build/build/ckeditor";
import InputError from "../../Common/InputError";
import { INPUT_VALIDATION } from "../../../constants/validation";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { editorConfiguration } from "../../Profile/Description/DescriptionEditor/Plugin";
import Button from "../../Common/Button";

export default function CreateBoardPageMain() {
  const [content, setContent] = useState("");
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      tags: [],
    },
  });

  const onSubmit = ({ title }) => {
    if (!isValid) {
      setFocus("title");
      return;
    }

    console.log(title);
    console.log(content);
  };
  return (
    <section className="flex px-4 py-8 max-w-2xl w-full">
      <form
        className="flex flex-col gap-6 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative">
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
        </div>
        <CKEditor
          editor={CustomEditor}
          data={content}
          config={editorConfiguration}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />
        <Button type="submit">완료</Button>
      </form>
    </section>
  );
}
