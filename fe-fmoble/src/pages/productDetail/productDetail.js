import React, { useState, useEffect } from "react";
//import lib
import StarRating from "react-star-ratings";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import "./productDetail.css";

import { useParams, Link, NavLink } from "react-router-dom";
import { getProduct, productStar, getRelated } from "../../functions/products";
import RatingModal from "../../component/modals/RatingModals";
import { formatCash } from "../../component/formatCash";
import { useSelector } from "react-redux";
import { showAverage } from "../../functions/ratings";
import { Card, Col, Row } from "react-bootstrap";
const ProductDetail = () => {
  // redux get user state
  const { user } = useSelector((state) => ({ ...state }));
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
  return (
    <div className="container">
      {/* {JSON.stringify(product.category)} */}
      <div className=" mt-5 mb-5">
        <div className="pb-3">
          {category && (
            <div>
              <Link className="namecate" to={`/${category.slug}`}>
                {category.name} /
              </Link>
              <span> {product.title}</span>
            </div>
          )}
        </div>
        <div className="card">
          {/* _id: {product._id} */}
          <div className="row g-0">
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
                    <Link to={`/${category.slug}`}> {category.name}</Link>
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
                  <button className="btn btn-dark">
                    <i className="fa-solid fa-cart-plus mr-2"></i>
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-center mt-5">Related Products</h3>
      {/* {JSON.stringify(related)} */}
      <Row>
        {related.map((item, index) => (
          <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
            <Card className=" card-prd" key={index}>
              <NavLink to={`/${item.slug}`}>
                <Card.Img
                  className="img-fluid"
                  src={
                    item.images && item.images.length ? item.images[0].url : ""
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
    </div>
  );
};

export default ProductDetail;
