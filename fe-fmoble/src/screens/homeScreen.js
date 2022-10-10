import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Banner from "../component/banner/banner";
import Products from "../component/Products";
import product from "../product";
const HomeScreen = () => {
  return (
    <>
      <Banner />
      <Container>
        <h1 className="mt-3">Lastest Products</h1>
        <Row>
          {product.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Products product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
