import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "../component/Header";
import Footer from "../component/Footer";
const WebSiteLayout = () => {
  return (
    <div>
      <Header />
      <Container>
        <main>
          <Outlet />
        </main>
      </Container>
      <Footer />
    </div>
  );
};

export default WebSiteLayout;
