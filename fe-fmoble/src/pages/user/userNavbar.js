import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserNavbar = () => {
  return (
    <div>
      <Nav variant="pills" className="flex-column">
        <Nav.Link href="/user/history">History</Nav.Link>
        <Nav.Link href="/user/password">Password</Nav.Link>
        <Nav.Link href="/user/wishlist">Wishlist</Nav.Link>
      </Nav>
    </div>
  );
};

export default UserNavbar;
