import firebase from "firebase";
import React from "react";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { MenuList } from "./data-menu/data-menu";
const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/");
  };
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div>
      <Navbar variant="light" sticky="stickky-top">
        <Container>
          <Navbar.Brand href="/">Fmobile</Navbar.Brand>
          <Nav as="ul" className="ml-auto mt-2">
            <Nav.Link href="/gio-hang">
              <i className="fas fa-shopping-cart"></i>
              {/* <div className="counter_cart">
                  <span className="">0</span>
                </div> */}
              <Badge bg="none">0</Badge>
            </Nav.Link>
            <div className="dropdown">
              {!user?.email && (
                <button className="dropbtn">
                  <i className=" fas fa-user"></i>
                </button>
              )}
              <div className="text-white pl-2 pt-3">
                {user?.email && user?.email.split("@")[0]}
              </div>
              {!user.email && (
                <div className="dropdown-content">
                  <Link to="/register">đăng ký</Link>
                  <Link to="/login">đăng nhập</Link>
                </div>
              )}
              {user.email && (
                <div className="dropdown-content">
                  <Link to="/" onClick={logout}>
                    đăng xuất
                  </Link>
                </div>
              )}
              {user && user.role === "admin" && (
                <div className="dropdown-content">
                  <Link to="/admin/dashboard">ADMIN PAGE</Link>
                  <Link to="/" onClick={logout}>
                    đăng xuất
                  </Link>
                </div>
              )}
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Nav>
        </Container>
      </Navbar>
      <Navbar
        className="nav-child"
        variant="dark"
        expand="lg"
        collapseOnSelect="false">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="basic-navbar-nav justify-content-center ">
          <Nav as="ul">
            {MenuList.map((data, index) => (
              <Nav.Item as="li" key={index}>
                <Nav.Link href={data.path}>{data.label}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
