import React, { useState } from "react";
import CustomEditor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useForm } from "react-hook-form";
import { editorConfiguration } from "../../Profile/Description/DescriptionEditor/Plugin";
import Button from "../../Common/Button";
import Title from "./Title";
import Tag from "./Tag";

export default function CreateBoardPageMain() {
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const {
    register: titleRegister,
    handleSubmit: onTitleSubmit,
    setFocus: setTitleFocus,
    formState: { errors: titleErrors, isValid: isTitleValid },
  } = useForm({
    defaultValues: {
      title: "",
    },
  });
  const {
    register: tagRegister,
    handleSubmit: onTagSubmit,
    setFocus: setTagFocus,
    reset: resetTag,
    formState: { errors: tagErrors, isValid: isTagValid },
  } = useForm({
    defaultValues: {
      tag: "",
    },
  });

  const handleTitleSubmit = onTitleSubmit(() => {
    if (!isTitleValid) {
      setTitleFocus("title");
      return;
    }

    setTagFocus("tag");
  });
  const handleTagSubmit = onTagSubmit(({ tag }) => {
    if (!isTagValid) {
      setTagFocus("tag");
      return;
    }

    setTags((prev) => [...prev, tag.trim()]);
    resetTag({ tag: "" });
  });
  return (
    <section className="flex flex-col gap-6 px-4 py-8 max-w-2xl w-full">
      <Title
        register={titleRegister}
        onTitleSubmit={handleTitleSubmit}
        errors={titleErrors}
      />
      <Tag
        tags={tags}
        setTags={setTags}
        register={tagRegister}
        errors={tagErrors}
        onSubmit={handleTagSubmit}
      />
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
    </section>
  );
}
