import React from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "./DescriptionEditor.css";

export default function DescriptionEditor({ content, readOnly }) {
  return readOnly ? (
    <div
      className="ck-content ck-read-only"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  ) : (
    <CKEditor
      editor={Editor}
      data={content}
      onReady={(editor) => {
        console.log("Editor is ready to use!", editor);
      }}
      onChange={(event) => {
        console.log(event);
      }}
      onBlur={(event, editor) => {
        console.log("Blur.", editor);
      }}
      onFocus={(event, editor) => {
        console.log("Focus.", editor);
      }}
    />
  );
}
