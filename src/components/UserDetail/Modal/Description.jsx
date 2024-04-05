import React from "react";
import DescriptionEditor from "../../Profile/Description/DescriptionEditor/DescriptionEditor";

export default function Description({ content }) {
  return (
    <article className="p-4 w-full grow">
      {content !== null && (
        <DescriptionEditor content={content} readOnly={true} />
      )}
    </article>
  );
}
