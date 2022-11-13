import React from "react";
import { Link } from "react-router-dom";
import { MenuAdmin } from "../data-menu/data-menu";
import "./adminNavbar.css";
import { useSelector } from "react-redux";

const AdminNav = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <>
      <nav className="navAdmin">
        <h3 className="text-center pt-4">Fmobile Admin</h3>
        <ul className="nav navUl flex-column">
          {MenuAdmin.map((item, index) => (
            <li className="nav-item navItem" key={index}>
              <Link to={item.path} className="nav-link">
                <i className={item.icon}></i>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <span className="name_admin">Xin chào, {user.name}</span>
      </nav>
    </>
  );
};

export default AdminNav;
