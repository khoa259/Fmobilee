import React, { useEffect, useState } from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCash } from "../component/formatCash";

import Spinner from "../component/spinner/spinner";
import {
  fetchProductsByFilter,
  getProductsByCount,
} from "../functions/products";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
  }, []);

  //load products defaul on page
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  //load product by search
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 1000);
    return () => clearTimeout(delayed);
  }, [text]);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };
  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-4">
          <h2 className="text-center p-3 pt-4 mb-1">Các sản phẩm</h2>
          {products?.length < 1 && <p>Không tìm thấy sản phẩm</p>}
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={6} md={6} lg={4} xl={3}>
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

                    <Card.Text as="p" className="price">
                      Giá từ {formatCash(`${product.price}`)}đ
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
      {/* <Pagination
        current={page}
        total={(productsCount / 2) * 4}
        onChange={(value) => setPage(value)}
      /> */}
    </Container>
  );
};

export default Shop;
