import { instance } from "../../../apis/axios";

const uploadAdapter = (loader) => {
  return {
    upload() {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        loader.file.then((file) => {
          formData.append("image", file);
          instance
            .post("/user/image-upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              resolve({
                default: res.data,
              });
            })
            .catch((err) => reject(err));
        });
      });
    },
  };
};

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
