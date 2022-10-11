import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Banner from "../component/banner/banner";
import Products from "../component/Products";
import axios from "axios";
const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    getAll();
  }, []);
  return (
    <>
      <Banner />
      <Container>
        <h1 className="mt-3">Lastest Products</h1>
        <Row>
          {products.map((product) => (
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
