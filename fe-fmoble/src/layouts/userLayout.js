import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import UserNav from "../component/userNavbar/userNavbar";

const UserLayout = () => {
  return (
    <Container>
      <div className="row pt-5">
        <div className="col-lg-3 col-sm-2">
          <UserNav />
        </div>
        <div className=" col-lg-9 col-sm-10 text-center">
          <div className="bg-light shadow-sm p-3 mb-5 bg-body rounded">
            <Outlet />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserLayout;
