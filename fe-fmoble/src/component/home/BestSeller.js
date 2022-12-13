import React, { useEffect, useState } from "react";
import { getProducts, getProductCount } from "../../functions/products";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Pagination } from "antd";

import Spinner from "../../component/spinner/spinner";
import { formatCash } from "../formatCash";
import { useSelector } from "react-redux";
import { showAverage } from "../../functions/ratings";

const BestSeller = () => {
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

  return (
    <div>
      <Container>
        {loading ? (
          <Spinner />
        ) : (
          <div className="mt-4">
            <h2 className="text-center p-3 mt-2 mb-1 ">Sản phẩm bán chạy</h2>
            <Row>
              {products.map((product, index) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Card className=" card-prd" key={index}>
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
                      <Card.Text as="p" className="price">
                        {formatCash(`${product.price}`)}đ
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
        <div className="w-full text-center mt-4">
          <Link to="/products">
            <button className="btn btn-md rounded btn-primary text-center">
              Xem thêm
            </button>
          </Link>
        </div>
        <Pagination
          current={page}
          total={(productsCount / 2) * 4}
          onChange={(value) => setPage(value)}
        />
      </Container>
    </div>
  );
};

export default BestSeller;
