import firebase from "firebase";
import React from "react";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Fmobile</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/gio-hang"></Nav.Link>
              <Nav.Link href="/gio-hang">
                <i className="px-1 fas fa-shopping-cart"></i>
                {/* <div className="counter_cart">
                  <span className="">0</span>
                </div> */}
                <Badge bg="dark ">0</Badge>
              </Nav.Link>
              <div className="dropdown">
                <p className="text-white pl-2 pt-3">
                  {user.email && user.email.split("@")[0]}
                </p>
                {!user.email && (
                  <button className="dropbtn">
                    <i className="px-1 fas fa-user"></i>
                  </button>
                )}
                {!user.email && (
                  <div className="dropdown-content">
                    <Link to="/register">đăng ký</Link>
                    <Link to="/login">đăng nhập</Link>
                  </div>
                )}
                {user.email && (
                  <div className="dropdown-content">
                    <Link to="/">đơn hàng</Link>
                    <Link to="/" onClick={logout}>
                      đăng xuất
                    </Link>
                  </div>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
