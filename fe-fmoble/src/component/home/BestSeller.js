import React, { useEffect, useState } from "react";
import { getProducts } from "../../functions/products";
import { Card, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import Spinner from "../../component/spinner/spinner";
import { useSelector } from "react-redux";

const BestSeller = () => {
  const { user } = useSelector((state) => ({ ...state }));
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
      <Container>
        {loading ? (
          <Spinner />
        ) : (
          <div className="mt-4">
            <Row>
              {products.map((product, index) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Card className="my-3 p-2 rounded card-prd" key={index}>
                    <NavLink to={`/product/${product.slug}`}>
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
      </Container>
    </div>
  );
};

export default BestSeller;
