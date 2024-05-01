import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomEditor from "ckeditor5-custom-build/build/ckeditor";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { editorConfiguration } from "../../Profile/Description/DescriptionEditor/Plugin";
import Button from "../../Common/Button";
import Title from "./Title";
import Tag from "./Tag";
import { createPost, updatePost } from "../../../apis/board";
import { BOARD_CREATE_REQUIRE_ERROR_MSG } from "../../../constants/errorMessage";
import { useSetRecoilState } from "recoil";
import { toastState } from "../../../recoil/atoms/toast";

export default function PostCreatePageMain({
  postTitle,
  postContent,
  postTags,
}) {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const titleRef = useRef(null);
  const [tags, setTags] = useState(postTags || []);
  const [content, setContent] = useState(postContent || "");
  const setToast = useSetRecoilState(toastState);
  const {
    register: titleRegister,
    handleSubmit: onTitleSubmit,
    setFocus: setTitleFocus,
    setError: setTitleError,
    getValues: getTitleValue,
    formState: { errors: titleErrors, isValid: isTitleValid },
  } = useForm({
    defaultValues: {
      title: postTitle || "",
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
  const updatePostMutate = useMutation({
    mutationFn: updatePost,
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
  const handleSubmit = () => {
    const data = {
      title: getTitleValue().title,
      content,
      tags,
      category: searchParams.get("type").toUpperCase(),
    };
    if (data.title.trim() === "") {
      setTitleFocus("title");
      setTitleError("title", {
        type: "required",
        message: BOARD_CREATE_REQUIRE_ERROR_MSG,
      });
      titleRef.current.scrollIntoView({ block: "end" });
      return;
    }

    if (data.content.trim() === "") {
      setToast({
        isOpen: true,
        message: "컨텐츠를 입력해주세요.",
      });
      setTimeout(() => {
        setToast({ isOpen: false, message: "" });
      }, 3000);
      return;
    }

    if (postId) {
      updatePostMutate.mutate({
        postId,
        ...data,
      });
    } else {
      createPostMutate.mutate(data);
    }
  };
  const handleCancelClick = () => {
    navigate(-1);
  };
  return (
    <section className="flex flex-col gap-6 px-4 py-8 max-w-2xl w-full">
      <Title
        ref={titleRef}
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
          onClick={handleSubmit}
        >
          등록
        </Button>
      </div>
    </section>
  );
}
