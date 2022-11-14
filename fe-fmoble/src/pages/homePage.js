import React, { useEffect, useState } from "react";
import { getProductsByCount, getProducts } from "../functions/products";
import { Card, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import Banner from "../component/banner/banner";
import Spiner from "../component/spinner/spinner";
import NewArrivels from "../component/home/NewArrivels";

const HomePage = () => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProduct();
  }, []);

  const loadAllProduct = () => {
    setLoading(false);
    getProducts("createAt", "desc", 3).then((res) => {
      setProduct(res.data);
    });
  };

  const formatCash = (str) => {
    return str
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ".") + prev;
      });
  };

  return (
    <div>
      <Banner />
      <Container>
        {loading ? (
          <Spiner />
        ) : (
          <div className="mt-4">
            <h2 className="text-center">Các sản phẩm mới</h2>
            <NewArrivels />
          </div>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
