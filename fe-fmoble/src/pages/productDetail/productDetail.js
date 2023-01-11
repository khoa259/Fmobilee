import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useParams, Link, NavLink, json, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import StarRating from "react-star-ratings";
import _ from "lodash";
//import lib

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./productDetail.css";

import { getProduct, productStar, getRelated } from "../../functions/products";
import { userCart } from "../../functions/user";
import RatingModal from "../../component/modals/RatingModals";
import { formatCash } from "../../component/formatCash";
import { showAverage } from "../../functions/ratings";
import { toast } from "react-toastify";

const ProductDetail = () => {
  // redux get user state
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  const { slug } = useParams();
  const { category } = product;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  // show user Ratings
  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy === user._id
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      // load related
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res);
      console.log(product);
    });
  };

  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      cart.push({
        ...product,
        count: 1,
      });
      let unique = _.uniqWith(cart, _.isEqual);
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
    }
    userCart(cart, user.token)
      .then(({ data }) => {
        if (data && data.succces) {
          toast.success(data.message);
        }
      })
      .catch((err) => console.log("cart save err", err));
  };
  return (
    <div className="container containerDetail">
      <div className=" mt-5 mb-5">
        <div className="pb-3">
          {category && (
            <div>
              <Link className="namecate" to={`/category/${category.slug}`}>
                {category.name} /
              </Link>
              <span> {product.title}</span>
            </div>
          )}
        </div>
        <div className="card rounded-lg">
          {/* _id: {product._id} */}
          <div className="row g-0 ">
            <div className="col-md-6 border-end">
              <div className=" ">
                <Carousel showArrows={true} infiniteLoop>
                  {product.images &&
                    product.images.map((i) => (
                      <img src={i.url} key={i.public_id} />
                    ))}
                </Carousel>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 right-side">
                <div className="pb-3">
                  {category && (
                    <Link to={`/category/${category.slug}`}>
                      {category.name}
                    </Link>
                  )}
                </div>
                <div>
                  {product.quantity > 0 ? (
                    <p className="text-success">còn hàng</p>
                  ) : (
                    <p className="text-danger">hết hàng</p>
                  )}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <h3>{product.title}</h3>
                </div>
                {product && product.ratings && product.ratings.length > 0 ? (
                  showAverage(product)
                ) : (
                  <div className="d-flex">
                    <p className="text-danger pr-5">chưa có đánh giá</p>
                    <div>
                      <RatingModal product={product}>
                        <StarRating
                          name={product._id}
                          numberOfStars={5}
                          rating={star}
                          changeRating={onStarClick}
                          isSelectable={true}
                          starRatedColor="red"
                        />
                      </RatingModal>
                    </div>
                  </div>
                )}
                <span className="heart">
                  <i className="bx bx-heart" />
                </span>
                <div className="mt-2 pr-3 content">
                  <p>{product.description}</p>
                </div>
                <span>441 reviews</span>
                <h3 className="price-detail">
                  {formatCash(`${product.price}`)}đ
                </h3>
                <hr />
                <div className="mt-2">
                  <span className="fw-bold">Color</span>
                  <div className="colors">
                    <ul className="marker d-flex">
                      <li className="marker-1" /> <li className="marker-2" />
                      <li className="marker-3" /> <li className="marker-4" />
                      <li className="marker-5" />
                    </ul>
                  </div>
                </div>
                <div className="inputs">
                  <button className=" decrements btn btn-outline-dark">
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    maxLength={2}
                    placeholder="1"
                  />
                  <button className="increments btn btn-outline-dark">
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <div className="buttons d-flex flex-row mt-2  gap-3">
                  {/* <button className="btn btn-outline-dark">Mua ngay</button> */}
                  <button
                    onClick={handleAddToCart}
                    className="btn btn-dark"
                    disabled={product.quantity === 0}>
                    <i className="fa-solid fa-cart-plus mr-2"></i>
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-center mt-5">Sản phẩm liên quan</h3>
      {/* {JSON.stringify(related)} */}

      {related.length == 0 ? (
        <span className="text-center">không có sản phẩm liên quan</span>
      ) : (
        <Row>
          {related.map((item, index) => (
            <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
              <Card className=" card-prd" key={index}>
                {product?.quantity !== 0 ? (
                  <div className="position-absolute stock">còn hàng</div>
                ) : (
                  <div className="position-absolute is-stock">hết hàng</div>
                )}
                <NavLink to={`/${item.slug}`}>
                  <Card.Img
                    className="img-fluid"
                    src={
                      item.images && item.images.length
                        ? item.images[0].url
                        : ""
                    }
                    variant="top"
                  />
                </NavLink>

                <Card.Body>
                  <NavLink to={`/${item.slug}`}>
                    <span className="span">{item.title}</span>
                  </NavLink>
                  <Card.Text as="p" className="price">
                    {formatCash(`${item.price}`)} đ
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ProductDetail;
