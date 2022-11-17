import React, { useState, useEffect } from "react";
//import lib
import StarRating from "react-star-ratings";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import "./productDetail.css";
import { useParams } from "react-router-dom";
import { getProduct } from "../../functions/products";
import RatingModal from "../../component/modals/RatingModals";
import { formatCash } from "../../component/formatCash";
const ProductDetail = ({ product }) => {
  const [products, setProduct] = useState();
  const { slug } = useParams();

  useEffect(() => {
    const getProudct = async () => {
      const { data } = await getProduct(slug);
      setProduct(data);
    };
    getProudct();
  }, []);
  return (
    <div>
      <h1>detail page</h1>
      {JSON.stringify(products)}
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
        <div className="card">
          <div className="row g-0">
            <div className="col-md-6 border-end">
              <div className=" ">
                <Carousel showArrows={true} infiniteLoop>
                  <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe9nfz7V-pKKGG5rv5_lACTeU1BDi82uk53w&usqp=CAU" />
                  </div>
                  <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe9nfz7V-pKKGG5rv5_lACTeU1BDi82uk53w&usqp=CAU" />
                  </div>
                  <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe9nfz7V-pKKGG5rv5_lACTeU1BDi82uk53w&usqp=CAU" />
                  </div>
                </Carousel>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 right-side">
                <div className="d-flex justify-content-between align-items-center">
                  <h3>Tên sản phẩm</h3>
                  <span className="heart">
                    <i className="bx bx-heart" />
                  </span>
                </div>
                <div className="mt-2 pr-3 content">
                  <p>Mô tả sản phẩm</p>
                </div>
                <span>441 reviews</span>
                <h3>$430.99</h3>

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
