import React from "react";
import Header from "../component/header/Header";
import Footer from "../component/Footer";
import { Outlet } from "react-router-dom";
const WebSiteLayout = () => {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default WebSiteLayout;
