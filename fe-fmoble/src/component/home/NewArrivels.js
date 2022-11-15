import React, { useEffect, useState } from "react";
import { getProducts, getProductCount } from "../../functions/products";
import { Card, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Pagination } from "antd";

import Banner from "../../component/banner/banner";
import Spinner from "../../component/spinner/spinner";
import { useSelector } from "react-redux";

const NewArrivels = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProduct();
  }, [page]);

  useEffect(() => {
    getProductCount().then((res) => setProductsCount(res.data));
  }, []);
  const loadAllProduct = () => {
    setLoading(false);
    getProducts("createdAt", "desc", page).then((res) => {
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
          <Spinner />
        ) : (
          <div className="mt-4">
            <h2 className="text-center p-3 mt-5 mb-5 jumbotron">
              Các sản phẩm mới
            </h2>
            <Row>
              {products.map((product, index) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Card className="my-3 p-2 rounded card-prd" key={index}>
                    <NavLink to={`/${product.slug}`}>
                      <Card.Img
                        className="img-fluid"
                        src={
                          product.images && product.images.length
                            ? product.images[0].url
                            : ""
                        }
                        variant="top"
                      />
                    </NavLink>

                    <Card.Body>
                      <NavLink to={`/product/${product.slug}`}>
                        <h5>{product.title}</h5>
                      </NavLink>
                      {/* <Card.Text as="div">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                />
              </Card.Text> */}
                      <Card.Text as="p" className="price">
                        {formatCash(`${product.price}`)} đ
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
        <Pagination
          current={page}
          total={(productsCount / 4) * 10}
          onChange={(value) => setPage(value)}
        />
      </Container>
    </div>
  );
};

export default NewArrivels;
