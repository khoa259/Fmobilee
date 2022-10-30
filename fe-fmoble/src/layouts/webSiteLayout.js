import React from "react";
import Header from "../component/header/Header";
import Footer from "../component/Footer";
const WebSiteLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default WebSiteLayout;
