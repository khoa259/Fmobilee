import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
// import { createProduct } from "../../../functions/category";
import { Table } from "react-bootstrap";
import Spiner from "../../../component/spiner";
import AdminNav from "../../../component/adminNav/adminNavbar";

const ProductCreate = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>Thêm Sản Phẩm</h4>
          {/* {categoryForm()} */}
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
