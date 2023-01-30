import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getWishlist, removeWishlist } from "../../functions/user";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "react-bootstrap";
import { formatCash } from "../../component/formatCash";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState();
  const { user } = useSelector((state) => ({ ...state }));
  const [token, setToken] = useState();
  const getToken = user.token;

  useEffect(() => {
    loadWishlist(token);
  }, [token]);

  useEffect(() => {
    const getToken = async () => {
      const value = localStorage.getItem("token");
      if (value) {
        setToken(value);
      }
    };
    getToken();
  }, []);

  const loadWishlist = async (key) => {
    const res = await getWishlist(key);
    if (
      res &&
      res.data &&
      res.data[0].wishlist &&
      res.data[0].wishlist.length > 0
    ) {
      setWishlist(res.data[0].wishlist);
    }
  };

  const handleRemove = (productId) =>
    removeWishlist(productId, getToken).then((res) => {
      console.log("res", res);
      loadWishlist();
    });

  return (
    <div>
      <h3 className="center">sản phẩm yêu thích</h3>
      <Row>
        {wishlist?.map((p, index) => (
          <Col lg={4} key={index}>
            <Card className="wishlist-card mt-0 mb-4">
              <div className="position-absolute icon-heart">
                <button className="icon-btn">
                  <i className="fa-solid fa-heart"></i>
                </button>
              </div>
              <Link to={`/${p.slug}`} target="_blank">
                <Card.Img
                  className="wishlist-img "
                  src={p.images && p.images.length ? p.images[0].url : ""}
                  variant="top"
                />

                <Card.Body>
                  <span className="wishlist-title">{p.title}</span>

                  <Card.Text as="p" className=" ">
                    Giá từ {formatCash(`${p.price}`)}đ
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
      {/* {JSON.stringify(wishlist.data.title)} */}
    </div>
  );
};

export default Wishlist;
