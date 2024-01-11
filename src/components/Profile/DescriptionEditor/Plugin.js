import { instance } from "../../../apis/axios";

const uploadAdapter = (loader) => {
  return {
    upload() {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        loader.file.then((file) => {
          formData.append("image", file);
          instance
            .post("url", formData)
            .then((res) => {
              resolve({
                default: res.data.data.url,
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
};
