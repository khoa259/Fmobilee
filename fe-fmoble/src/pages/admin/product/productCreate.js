import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import Spiner from "../../../component/spiner";
import AdminNav from "../../../component/adminNav/adminNavbar";
import { createProduct } from "../../../functions/products";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductCreate = ({ history }) => {
  const [value, setValue] = useState(initialState);

  // getUser by react-redux

  const { user } = useSelector((state) => ({ ...state }));

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
    brands,
  } = value;
  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(value, user.token)
      .then((res) => {
        console.log(res);
        history.push("/");
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
        <div className="col-md-2">{/* <AdminNav /> */}</div>
        <div className="col">
          <h4>Thêm Sản Phẩm</h4>
          {JSON.stringify(value)}
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
              <label>Shipping</label>
              <select
                name="shipping"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please select</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
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
              <label>Color</label>
              <select
                name="color"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please select</option>
                {colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Brand</label>
              <select
                name="brand"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please select</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-outline-info">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
