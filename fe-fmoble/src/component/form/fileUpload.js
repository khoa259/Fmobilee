import React from "react";

const FileUpload = () => {
  const fileUploadAndResize = () => {};
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
