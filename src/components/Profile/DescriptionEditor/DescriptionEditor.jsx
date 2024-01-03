import React from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "./DescriptionEditor.css";

export default function DescriptionEditor({ content, onChange, readOnly }) {
  return readOnly ? (
    <div
      className="ck-content ck-read-only"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  ) : (
    <CKEditor
      editor={Editor}
      data={content}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}
