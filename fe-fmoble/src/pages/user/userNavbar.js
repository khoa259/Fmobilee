import React from "react";
import { Nav } from "react-bootstrap";

const UserNavbar = () => {
  return (
    <div>
      <Nav defaultActiveKey="/home" variant="pills" className="flex-column">
        <Nav.Link href="/home">History</Nav.Link>
        <Nav.Link href="/" eventKey="link-1">
          Password
        </Nav.Link>
        <Nav.Link href="/" eventKey="link-2">
          Wishlist
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default UserNavbar;
