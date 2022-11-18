import React, { useState, useEffect } from "react";
//import lib
import StarRating from "react-star-ratings";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import "./productDetail.css";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../../functions/products";
import RatingModal from "../../component/modals/RatingModals";
import { formatCash } from "../../component/formatCash";
const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const { slug } = useParams();
  const { category } = product;

  useEffect(() => {
    const getProudct = async () => {
      const { data } = await getProduct(slug);
      setProduct(data);
    };
    getProudct();
  }, []);
  return (
    <div>
      {/* {JSON.stringify(product.category)} */}
      <RatingModal>
        <StarRating
          name={slug}
          numberOfStars={5}
          rating={2}
          changeRating={(newRating, name) =>
            console.log("New Rating", newRating, "name", name)
          }
          isSelectable={true}
        />
      </RatingModal>

      <div className="container mt-5 mb-5">
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
                  <span className="heart">
                    <i className="bx bx-heart" />
                  </span>
                </div>
                <div className="mt-2 pr-3 content">
                  <p>{product.description}</p>
                </div>
                <span>441 reviews</span>
                <h3 className="price-detail">
                  {formatCash(`${product.price}`)}đ
                </h3>

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
    </div>
  );
};

export default ProductDetail;
