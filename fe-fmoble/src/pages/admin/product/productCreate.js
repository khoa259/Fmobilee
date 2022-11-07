import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import Spiner from "../../../component/spiner";
import AdminNav from "../../../component/adminNav/adminNavbar";
import { createProduct } from "../../../functions/products";
import { getCategories } from "../../../functions/category";

const initialState = {
  title: "Apple iPhone 14 Pro Max - Chính Hãng VN/A ",
  description:
    "iPhone 14 Pro Max VN/A là dòng sản phẩm cao cấp nhất nằm trong thế hệ iPhone 14 Series mới vừa được ra mắt cùng với nhiều nâng cấp về ngoại hình và tính năng, hứa hẹn sẽ là dòng sản phẩm đột phá trong vài năm trở lại đây của Apple.",
  price: "31490000",
  categories: [],
  category: "",
  shipping: "Yes",
  quantity: "10",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["iPhone", "Macbook", "iMac", "Apple Watch", "Phụ kiện"],
  color: "Brown",
  // brand: "Apple",
};

const ProductCreate = () => {
  const history = useNavigate();
  const [value, setValue] = useState(initialState);

  // getUser by react-redux

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () =>
    getCategories().then((c) => setValue({ ...value, categories: c.data }));

  const {
    title,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    image,
    colors,
    // brands,
  } = value;
  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(value, user.token)
      .then((res) => {
        console.log(res);
        history("/admin/product");
        toast.success(`${value.title} is created`);
      })
      .catch((err) => {
        toast.error(err.response.data.err);
      });
    //
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h4 className="text-center">Thêm Sản Phẩm</h4>
          {/* {JSON.stringify(value)} */}
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                className="form-control"
                onChange={handleChange}>
                <option>Please select</option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Color</label>
              <select
                name="color"
                className="form-control"
                onChange={handleChange}>
                <option>Please select</option>
                {colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={quantity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Shipping</label>
              <select
                name="shipping"
                className="form-control"
                onChange={handleChange}>
                <option>Please select</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            {/* <div className="form-group">
              <label>Brand</label>
              <select
                name="brand"
                className="form-control"
                onChange={handleChange}>
                <option>Please select</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div> */}

            <button className="btn btn-outline-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
