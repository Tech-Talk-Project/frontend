import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "../../Common/Button";
import Title from "./Title";
import Tag from "./Tag";
import { BOARD_CREATE_REQUIRE_ERROR_MSG } from "../../../constants/errorMessage";
import useToast from "../../../hooks/useToast";
import useBoard from "../../../hooks/useBoard";

const Editor = React.lazy(() => import("../../Common/Editor/Editor"));

export default function PostCreatePageMain({
  postTitle,
  postContent,
  postTags,
}) {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const titleRef = useRef(null);
  const [tags, setTags] = useState(postTags || []);
  const [content, setContent] = useState(postContent || "");
  const { showToast } = useToast();
  const { createPostMutate, updatePostMutate } = useBoard({ postId });
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
      category: type.toUpperCase(),
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
      showToast("컨텐츠를 입력해주세요.");
      return;
    }

    if (postId) {
      updatePostMutate.mutate(
        { data },
        {
          onError: () => {
            navigate(`/board/post/${postId}?type=${type}`);
          },
        }
      );
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
      <Editor content={content} onChange={setContent} readOnly={false} />
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
