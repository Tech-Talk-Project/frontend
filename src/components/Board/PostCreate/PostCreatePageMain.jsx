import React, { useState } from "react";
import CustomEditor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useForm } from "react-hook-form";
import { editorConfiguration } from "../../Profile/Description/DescriptionEditor/Plugin";
import Button from "../../Common/Button";
import Title from "./Title";
import Tag from "./Tag";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../../apis/board";

export default function PostCreatePageMain() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const {
    register: titleRegister,
    handleSubmit: onTitleSubmit,
    setFocus: setTitleFocus,
    getValues: getTitleValue,
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
  const createPostMutate = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      navigate(-1);
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
  const handleCreateClick = () => {
    createPostMutate.mutate({
      title: getTitleValue().title,
      content: content,
      tags,
      category: searchParams.get("type").toUpperCase(),
    });
  };
  const handleCancelClick = () => {
    navigate(-1);
  };
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
      <div className="flex justify-end gap-4 pb-8">
        <Button
          className="py-2 text-sm hover:bg-white hover:text-black"
          onClick={handleCancelClick}
        >
          취소
        </Button>
        <Button
          className="py-2 text-sm bg-brand hover:bg-white hover:text-brand"
          onClick={handleCreateClick}
        >
          등록
        </Button>
      </div>
    </section>
  );
}
