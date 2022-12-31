import React, { useEffect, useState } from "react";
import { Row, Card, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Menu, Slider } from "antd";

import "../component/navShop/navShop.css";
import { formatCash } from "../component/formatCash";
// import NavShop from "../component/navShop/navShop";
import Spinner from "../component/spinner/spinner";
import {
  fetchProductsByFilter,
  getProductsByCount,
} from "../functions/products";

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0, 0);
  const [ok, setOk] = useState(false);

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  useEffect(() => {
    loadAllProducts();
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };
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

  // fillter product by price
  useEffect(() => {
    fetchProducts({ price });
    console.log("ok to request", price);
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  function getItem(label, key, children, type) {
    return {
      key,
      children,
      label,
      type,
    };
  }
  const formatter = (v) => `${v} đ`;
  const items = [
    getItem(<h6>Giá sản phẩm</h6>, "1", [
      getItem(
        <Slider
          // className="ml-4 mr-4"
          tooltip={{ formatter }}
          range
          // value={price}
          onChange={handleSlider}
          max={90000000}
          min={0}
        />
      ),
    ]),
  ];
  return (
    <div className="container-fluid">
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-4">
          <h2 className="text-center p-3 pt-4 mb-1">Các sản phẩm</h2>
          <Row className="rowShop">
            <Col lg={2} className="col-filter">
              {/* <NavShop /> */}
              <Menu
                mode="inline"
                defaultOpenKeys={["1", "2"]}
                className="bg-light shadow-sm p-3 mb-5 bg-body rounded"
                items={items}
              >
                {/* <SubMenu key="1" title={"Giá sản phẩm"}>
                  <div>
                    <Slider
                      range
                      tooltip={{ formatter }}
                      // value={price}
                      onChange={handleSlider}
                      max={60000000}
                    />
                  </div>
                </SubMenu> */}
              </Menu>
            </Col>
            {products?.length < 1 && (
              <div className="text-center">Không tìm thấy sản phẩm</div>
            )}
            {products.map((product) => (
              <Col key={product._id} sm={6} md={6} lg={3} xl={2}>
                <Card className="card-prd">
                  {product?.quantity !== 0 ? (
                    <div className="position-absolute stock">còn hàng</div>
                  ) : (
                    <div className="position-absolute is-stock">hết hàng</div>
                  )}
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
                    <NavLink to={`${product.slug}`}>
                      <span className="span">{product.title}</span>
                    </NavLink>

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
    </div>
  );
};

export default Shop;
