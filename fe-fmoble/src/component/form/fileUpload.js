import React from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
const FileUpload = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const fileUploadAndResize = (e) => {
    let files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (url) => {
            console.log(url);
            //
          },
          "base64"
        );
      }
    }
  };
  return (
    <div className="">
      <label>Ảnh sản phẩm</label> <br />
      <label className="btn btn-primary btn-raised">
        Upload
        <input
          type="file"
          multiple
          hidden
          accept="images/*"
          onChange={fileUploadAndResize}
        />
      </label>
    </div>
  );
};

export default FileUpload;
