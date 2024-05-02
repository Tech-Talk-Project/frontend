import React from "react";

export default function Content({ content }) {
  return (
    <article className="p-4">
      <div
        className="ck-content ck-read-only"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
