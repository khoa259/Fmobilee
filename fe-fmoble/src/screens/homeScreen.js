import React from "react";
import Product from "../component/Product";
import products from "../products";
import { Row, Col } from "react-bootstrap";
const HomeScreen = () => {
  return (
    <div>
      <h1>Sản phẩm mới nhất</h1>
      <Row>
        {products.map((product, index) => (
          <Col key={index} sm={12} md={6} lg={4}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeScreen;
