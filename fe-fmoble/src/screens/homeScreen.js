import React from "react";
import { Col, Row } from "react-bootstrap";
import Products from "../component/Products";
import product from "../product";
const HomeScreen = () => {
  return (
    <>
      <h1>Lastest Products</h1>
      <Row>
        {product.map((products) => (
          <Col sm={12} md={6} lg={4}>
            <Products products={products} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
