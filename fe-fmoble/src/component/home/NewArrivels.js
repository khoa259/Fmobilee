import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { toast } from "react-toastify";
import _ from "lodash";

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
  // const [product, setProduct] = useState({});

  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

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

  // const handleAddToCart = () => {
  //   let cart = [];
  //   if (typeof window !== "undefined") {
  //     cart.push({
  //       ...product,
  //       count: 1,
  //     });
  //     let unique = _.uniqWith(cart, _.isEqual);
  //     dispatch({
  //       type: "ADD_TO_CART",
  //       payload: unique,
  //     });
  //   }
  //   userCart(cart, user.token)
  //     .then(({ data }) => {
  //       if (data && data.succces) {
  //         toast.success(data.message);
  //       }
  //     })
  //     .catch((err) => console.log("cart save err", err));
  // };
  return (
    <div>
      <Banner />
      <Container>
        {loading ? (
          <Spinner />
        ) : (
          <div className="mt-4">
            <h2 className="text-center p-3 mt-2 mb-1">Các sản phẩm mới</h2>
            <Row>
              {products.map((product, index) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Card className="card-prd" key={index}>
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
                    {/* <div className="btnAddToCart">
                      <button
                        onClick={handleAddToCart}
                        className="btn"
                        disabled={product.quantity === 0}>
                        <i className="fa-solid fa-cart-plus mr-2"></i>
                        Thêm vào giỏ hàng
                      </button>
                    </div> */}
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
