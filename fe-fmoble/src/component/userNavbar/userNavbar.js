import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./userNav.css";

const UserNav = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <nav className="">
      <ul className="nav flex-column bg-light shadow-sm p-3 mb-5 bg-body rounded d-block">
        <li>
          <Link to={`/user/profile/${user._id}`} className="nav_link-user ">
            <i className="fa-solid fa-user text-danger"></i> Tài khoản của tôi
          </Link>
        </li>
        <li>
          <Link to="/user/purchase" className="nav_link-user ">
            <i className="fa-solid fa-bag-shopping text-success"></i> Đơn hàng
            của tôi
          </Link>
        </li>

        <li>
          <Link to="/user/password" className="nav_link-user">
            <i className="fa-solid fa-lock text-info"></i> Password
          </Link>
        </li>

        <li>
          <Link to="/user/wishlist" className="nav_link-user">
            Wishlist
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
