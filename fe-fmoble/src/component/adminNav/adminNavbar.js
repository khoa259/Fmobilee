import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuAdmin } from "../data-menu/data-menu";
import "./adminNavbar.css";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase";

const AdminNav = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const logout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất không")) {
      firebase.auth().signOut();
      localStorage.clear();
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      history("/");
    }
  };
  return (
    <div className="sidebar">
      <div className="logo-details">
        <i className="bx bxl-c-plus-plus icon" />
        <div className="logo_name">Fmobile</div>
        <i className="bx fa-solid fa-bars" id="btn" />
      </div>
      <ul className="nav-list">
        {MenuAdmin?.map((m, index) => (
          <li key={index}>
            <Link to={m.path}>
              <i className={m.icon} />
              <span className="links_name">{m.label}</span>
            </Link>
            <span className="tooltip">{m.label}</span>
          </li>
        ))}
        <li className="profile">
          <i
            onClick={logout}
            className="logout fa-solid fa-arrow-right-from-bracket "></i>
        </li>
      </ul>
    </div>
  );
};

export default AdminNav;
