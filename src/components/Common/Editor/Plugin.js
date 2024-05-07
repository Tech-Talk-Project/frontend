import { uploadImage } from "../../../apis/profile";

function uploadAdapter(loader) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        loader.file.then((file) => {
          formData.append("image", file);
          uploadImage({ formData, resolve, reject });
        });
      });
    },
  };
}

function uploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}

export const editorConfiguration = {
  extraPlugins: [uploadPlugin],
  toolbar: {
    items: [
      "bold",
      "italic",
      "link",
      "code",
      "codeBlock",
      "|",
      "fontSize",
      "fontColor",
      "bulletedList",
      "numberedList",
      "todoList",
      "|",
      "alignment",
      "outdent",
      "indent",
      "|",
      "blockQuote",
      "imageUpload",
      "insertTable",
      "|",
      "undo",
      "redo",
    ],
  },
};
