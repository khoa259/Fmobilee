import React from "react";
import { Link } from "react-router-dom";
import "./adminNavbar.css";

const AdminNav = () => {
  return (
    <nav className="navAdmin mt-4">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/product" className="nav-link">
            Quản lý sản phẩm
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/category" className="nav-link">
            Quản lý danh mục
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/coupon" className="nav-link">
            Quản lý đơn hàng
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user/password" className="nav-link">
            Password
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Website
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
