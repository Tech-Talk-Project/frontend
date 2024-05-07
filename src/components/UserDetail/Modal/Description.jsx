import React from "react";
import Editor from "../../Common/Editor/Editor";

export default function Description({ content }) {
  return (
    <article className="p-4 w-full grow">
      {content !== null && <Editor content={content} readOnly={true} />}
    </article>
  );
}
