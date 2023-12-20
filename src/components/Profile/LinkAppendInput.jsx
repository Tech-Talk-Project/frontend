import React, { useEffect, useRef, useState } from "react";
import { Input } from "@material-tailwind/react";
import { MdAdd } from "react-icons/md";
import InputError from "../Common/InputError";
import Button from "../Common/Button";
import { LINK_PATTERN_ERROR_MSG } from "../../constants/errorMessage";
import { LINK_PATTERN } from "../../constants/pattern";

export default function LinkAppendInput({ addLink, isEditing }) {
  const inputRef = useRef(null);
  const [linkInput, setLinkInput] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setLinkInput(e.target.value);
  };
  const handleClick = () => {
    if (!LINK_PATTERN.test(linkInput)) {
      setIsError(true);
      return;
    }

    addLink({ link: linkInput });
    setIsError(false);
    setLinkInput("");
  };
  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleClick();
    }
  };

  useEffect(() => {
    if (!isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing, inputRef]);
  return (
    <div className="relative flex flex-col gap-4 my-2">
      <Input
        inputRef={inputRef}
        type="text"
        className="pr-16 border-none font-semibold"
        value={linkInput}
        onChange={handleChange}
        onKeyDown={handleSubmit}
        labelProps={{
          className: "hidden",
        }}
        containerProps={{
          className: "bg-white min-w-fit rounded-[7px] h-8",
        }}
      />
      <Button
        type="button"
        className="!absolute right-[2px] top-[2px] px-4 py-[2px] h-7 rounded-[7px] bg-brand text-lg"
        onClick={handleClick}
      >
        <MdAdd className=" font-extrabold" />
      </Button>
      {isError && <InputError message={LINK_PATTERN_ERROR_MSG} />}
    </div>
  );
}
