import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/products";
import { getCategories } from "../../../functions/category";
import ProductCreateForm from "../../../component/form/productCreateForm";
import FileUpload from "../../../component/form/fileUpload";

const ProductUpdate = () => {
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  // getUser by react-redux

  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h4 className="text-center">Product Update</h4>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
