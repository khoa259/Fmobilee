import React from "react";

const ProductCreateForm = ({ handleSubmit, handleChange, value }) => {
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
        <select name="color" className="form-control" onChange={handleChange}>
          <option>Lựa chọn màu sắc</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
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
