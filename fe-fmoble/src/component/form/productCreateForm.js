import { Select } from "antd";
import React, { useState } from "react";
import { colorProduct } from "../../utils/contants";

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  value,
  setColor,
  color,
}) => {
  const {
    title,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    images,
    colors,
    brands,
  } = value;
  const options = colorProduct.map((item) => {
    return {
      label: item.label,
      value: item.key,
    };
  });

  const handleChangeColor = (value) => {
    setColor(value);
  };

  console.log("color", color);
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Tên sản phẩm</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="">
        <label>Mô tả sản phẩm</label>
        <br />
        <textarea
          type="text"
          name="description"
          cols={60}
          rows={10}
          value={description}
          onChange={handleChange}></textarea>
      </div>

      <div className="form-group">
        <label>Danh mục sản phẩm</label>
        <select
          name="category"
          className="form-control"
          onChange={handleChange}>
          <option>Lựa chọn danh mục</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label>Giá tiền</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Màu sắc</label>
        <Select
          mode="multiple"
          size={"middle"}
          placeholder="Lựa chọn màu sắc"
          onChange={handleChangeColor}
          style={{ width: "100%" }}
          options={options}
        />
      </div>

      <div className="form-group">
        <label>Số lượng</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Vận chuyển</label>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}>
          <option>Lựa chọn vận chuyển</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <button className="btn btn-outline-primary">Thêm mới</button>
    </form>
  );
};

export default ProductCreateForm;
