import React, { useState } from "react";
import Header from "../component/header/Header";
import Footer from "../component/Footer";
import { Outlet } from "react-router-dom";
const WebSiteLayout = () => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <div>
      <Header />
      <div className="main">
        <button
          onClick={scrollToTop}
          style={{ display: visible ? "inline" : "none" }}
          className="arrow"
          id="myBtn">
          <i className="fa-solid fa-arrow-up"></i>
        </button>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default WebSiteLayout;
