import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
const WebSiteLayout = () => {
  return (
    <div>
      <Header />
      <main className="mt-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default WebSiteLayout;
