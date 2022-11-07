import React from "react";
import { Link } from "react-router-dom";
import { MenuAdmin } from "../data-menu/data-menu";
import "./adminNavbar.css";

const AdminNav = () => {
  return (
    <nav className="navAdmin">
      <ul className="nav navUl flex-column">
        {MenuAdmin.map((item, index) => (
          <li className="nav-item navItem" key={index}>
            <Link to={item.path} className="nav-link">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNav;
