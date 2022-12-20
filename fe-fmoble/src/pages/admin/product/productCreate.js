import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/products";
import { getCategories } from "../../../functions/category";
import ProductCreateForm from "../../../component/form/productCreateForm";
import FileUpload from "../../../component/form/fileUpload";
import Spiner from "../../../component/spinner/spinner";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  color: "",
};

const ProductCreate = () => {
  const history = useNavigate();
  const [value, setValue] = useState(initialState);
  const [loading, setLoading] = useState(false);
  // getUser by react-redux

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () =>
    getCategories().then((c) => setValue({ ...value, categories: c.data }));

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

  //format price VND

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h4 className="text-center">Thêm Sản Phẩm</h4>
          <hr />
          <FileUpload
            value={value}
            setValue={setValue}
            loading={loading}
            setLoading={setLoading}
          />
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            value={value}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
