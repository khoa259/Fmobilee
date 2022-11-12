import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct } from "../../../functions/products";
import { getCategories } from "../../../functions/category";
import FileUpload from "../../../component/form/fileUpload";

const ProductUpdate = ({ match }) => {
  const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["iPhone", "Macbook", "iMac", "Apple Watch", "Phụ kiện"],
    color: "Brown",
    // brand: "Apple",
  };
  const { slug } = useParams();
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(initialState);
  // getUser by react-redux

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadProduct();
  }, []);
  const loadProduct = () => {
    getProduct(slug).then((p) => {
      console.log("single Product", p);
      setValue({ ...value, ...p.data });
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h4 className="text-center">Product Update</h4>
          {JSON.stringify(value)}
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
