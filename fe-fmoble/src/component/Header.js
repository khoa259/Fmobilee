import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
// Hide Menu on Scroll
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-89px";
  }
  prevScrollpos = currentScrollPos;
};

const Header = () => {
  return (
    <div id="navbar">
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Fmobile</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto ">
              <Nav.Link href="/gio-hang">
                <i className="px-1 fas fa-shopping-cart"></i> Giỏ hàng
              </Nav.Link>
              <Nav.Link href="/login">
                <i className="px-1 fas fa-user"></i>Đăng nhập
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
