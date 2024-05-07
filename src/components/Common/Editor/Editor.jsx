import React from "react";
import CustomEditor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "./Editor.css";
import { editorConfiguration } from "./Plugin";

export default function DescriptionEditor({ content, onChange, readOnly }) {
  return readOnly ? (
    <div
      className="ck-content ck-read-only"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  ) : (
    <CKEditor
      editor={CustomEditor}
      data={content}
      config={editorConfiguration}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}
