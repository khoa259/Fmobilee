import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { toast } from "react-toastify";
import _ from "lodash";

import "./Home.css";

import { getProducts, getProductCount } from "../../functions/products";
// import { userCart } from "../../functions/user";

import Banner from "../../component/banner/banner";
import Spinner from "../../component/spinner/spinner";
import { formatCash } from "../formatCash";

const NewArrivels = () => {
  const [products, setProducts] = useState([]);
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
      setProducts(res.data);
    });
  };
  console.log("products", productsCount);

  return (
    <div>
      <Banner />
      <Container>
        {loading ? (
          <Spinner />
        ) : (
          <div className="mt-4">
            {products.slice(0, 4).map((product, index) => (
              <div key={index}>
                <div className="text-center mt-5 ">
                  <Link
                    to={`/category/${product.category.slug}`}
                    className="title h2">
                    {product.category.name}
                  </Link>
                </div>
                <Row>
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Card className="card-prd">
                      {product?.quantity !== 0 ? (
                        <div className="position-absolute stock">còn hàng</div>
                      ) : (
                        <div className="position-absolute is-stock">
                          hết hàng
                        </div>
                      )}
                      <Link to={`/${product.slug}`}>
                        <Card.Img
                          className="img-fluid"
                          src={
                            product.images && product.images.length
                              ? product.images[0].url
                              : ""
                          }
                          variant="top"
                        />
                      </Link>

                      <Card.Body>
                        <Link to={`/${product.slug}`}>
                          <span className="span">{product.title}</span>
                        </Link>

                        <Link to={`/${product.slug}`} className="price">
                          Giá từ {formatCash(`${product.price}`)}đ
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <div className="mt-2 text-center">
                  <Link to={`/category/${product.category.slug}`}>
                    <button className="btnViewMore">
                      Xem thêm {product.category.name}
                      <i className="fa-solid fa-arrow-right pl-2"></i>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* <Pagination
          current={page}
          total={(productsCount / 2) * 4}
          onChange={(value) => setPage(value)}
        /> */}
      </Container>
    </div>
  );
};

export default NewArrivels;
