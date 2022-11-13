import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct } from "../../../functions/products";
import { getCategories } from "../../../functions/category";
import FileUpload from "../../../component/form/fileUpload";
import ProductUpdateForm from "../../../component/form/ProductUpdateForm";
import Spiner from "../../../component/spinner/spinner";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["iPhone", "Macbook", "iMac", "Apple Watch", "Phụ kiện"],
  color: "",
  // brand: "Apple",
};
const ProductUpdate = ({ match }) => {
  const { slug } = useParams();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(initialState);
  // getUser by react-redux

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);
  const loadProduct = () => {
    getProduct(slug).then((p) => {
      console.log("single Product", p);
      setValue({ ...value, ...p.data });
    });
  };
  const loadCategories = () =>
    getCategories().then((c) => {
      console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
      setCategory(c.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCatagoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValue({ ...value, category: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h4 className="text-center">Product Update</h4>
          {/* {JSON.stringify(value)} */}
          {loading ? (
            <Spiner />
          ) : (
            <FileUpload
              value={value}
              setValue={setValue}
              setLoading={setLoading}
            />
          )}
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValue}
            values={value}
            handleCatagoryChange={handleCatagoryChange}
            categories={category}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
