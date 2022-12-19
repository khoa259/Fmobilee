import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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
  }, []);
  useEffect(() => {
    const getToken = localStorage.getItem("token");
    getUserCart(getToken).then((e) => {
      setCartDB(e.data.products);
    });
  }, [cartDB.length]);
  return (
    <nav className="navbars navbar-expand-md fixed-top">
      <div className="container-header container-lg">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <i className="fa-solid fa-bars icon-bars"></i>
        </button>

        <Link className="navbar-brand logo" to="/">
          Fmobile
        </Link>
        <div
          className="collapse navbar-collapse justify-content-center "
          id="navbarSupportedContent">
          <ul className=" me-auto mb-2 mb-lg-0">
            {categories.map((c) => (
              <li key={c._id}>
                <Link
                  className="nav-header"
                  aria-current="page"
                  to={`/category/${c.slug}`}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="icon-header">
          <Search />
          <Link to="/gio-hang">
            <i className="fas fa-shopping-cart position-relative">
              <span className="badge" bg="none">
                {cartDB.length}
              </span>
            </i>
          </Link>
          <div className="dropdown collapse navbar-collapse">
            {!user?.email && (
              <button className="dropbtn">
                <i className=" fas fa-user"></i>
              </button>
            )}
            <div className="text-white ">
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
                <Link to={"/user/history"}>Settings</Link>
                <Link to="/" onClick={logout}>
                  đăng xuất
                </Link>
              </div>
            )}
            {user?.email && user?.role === "admin" && (
              <div className="dropdown-content">
                <Link to="/" onClick={logout}>
                  đăng xuất
                </Link>
                <Link to="/admin/dashboard">Dashboard</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
