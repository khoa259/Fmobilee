import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { toast } from "react-toastify";
import _ from "lodash";

import "./Home.css";

import { getProductsByCount } from "../../functions/products";
// import { userCart } from "../../functions/user";

import Banner from "../../component/banner/banner";
import Spinner from "../../component/spinner/spinner";
import { formatCash } from "../formatCash";

const NewArrivels = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductsByCount(8).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  }, []);
  console.log("products", products);

  return (
    <div>
      <Banner />
      <Container>
        {loading ? (
          <Spinner />
        ) : (
          <div className="mt-4">
            <div className="text-center mt-5 ">
              <h2 className="title">Sản phẩm mới nhất</h2>
            </div>
            <Row>
              {products.map((product, index) => (
                <Col key={index} sm={12} md={6} lg={4} xl={3}>
                  <Card className="card-prd">
                    {product?.quantity !== 0 ? (
                      <div className="position-absolute stock">còn hàng</div>
                    ) : (
                      <div className="position-absolute is-stock">hết hàng</div>
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
              ))}
            </Row>
            <div className="mt-5 text-center">
              <Link to="/products">
                <button className="btnViewMore">
                  Xem thêm sản phẩm
                  <i className="fa-solid fa-arrow-right pl-2"></i>
                </button>
              </Link>
            </div>
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
