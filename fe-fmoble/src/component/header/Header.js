import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "antd";

import { getCategories } from "../../functions/category";
import { getUserCart } from "../../functions/user";
import Search from "../form/Search";
import "./header.css";
const Header = () => {
  const [categories, setCategories] = useState([]);
  const [cartDB, setCartDB] = useState([]);
  const history = useNavigate();
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));
  const logout = () => {
    firebase.auth().signOut();
    localStorage.clear();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history("/");
  };

  useEffect(() => {
    getCategories().then((c) => {
      setCategories(c.data);
    });
    const getToken = localStorage.getItem("token");
    getUserCart(getToken).then((e) => {
      setCartDB(e.data.products);
    });
  }, []);
  const items = categories.map((c, i) => {
    return {
      key: i,
      label: (
        <Link
          className="itemDrop"
          // target="_blank"
          rel="noopener noreferrer"
          to={`/category/${c.slug}`}
        >
          {c.name}
        </Link>
      ),
    };
  });
  return (
    <div className="header fixed-top">
      <div className="header-item navbar">
        <div className="logo">
          <Link to="/">Fmobile</Link>
        </div>
        <div className="navItem">
          <ul>
            <li>
              <Link className="navLink" to="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottom"
              >
                <Link to="/products">
                  Sản phẩm <i className="fa-solid fa-angle-down"></i>
                </Link>
              </Dropdown>
            </li>
            <li>
              <Link className="navLink" to="/">
                Tin Tức
              </Link>
            </li>
            <li>
              <Link className="navLink" to="/">
                Liên Hệ
              </Link>
            </li>
            <li>
              <Link className="navLink" to="/">
                Giới Thiệu
              </Link>
            </li>
          </ul>
        </div>
        <div className="header-link-wrapper">
          <div className="icon-search">
            <Search />
          </div>
          <div className="icon-bag">
            <Link to="/gio-hang">
              <i className="fas fa-shopping-cart position-relative">
                <span className="badge" bg="none">
                  {cartDB.length}
                </span>
              </i>
            </Link>
          </div>
          <div className="dropdown">
            {/* nếu user không tồn tai */}
            {!user?.email && (
              <button className="dropbtn">
                <i className=" fas fa-user"></i>
              </button>
            )}
            <div className="text-white pl-2 ">
              {user?.email && user?.email.split("@")[0]}
            </div>
            {!user?.email && (
              <div className="dropdown-content">
                <Link to="/register">đăng ký</Link>
                <Link to="/login">đăng nhập</Link>
              </div>
            )}
            {/* Nếu user có tồn tại  */}
            {user?.email && user?.role === "subscriber" && (
              <div className="dropdown-content">
                <Link to={`/user/profile/${user._id}`}>Settings</Link>
                <Link to="/" onClick={logout}>
                  đăng xuất
                </Link>
              </div>
            )}

            {user?.email && user?.role === "admin" && (
              <div className="dropdown-content">
                <Link to="/admin/dashboard">Dashboard</Link>
                <Link to="/" onClick={logout}>
                  đăng xuất
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
