import React from "react";
import ModalImage from "react-modal-image";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { formatCash } from "../formatCash";
const ProductCartInCheckOut = ({ p }) => {
  let dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const handleQuantityChange = (e) => {
    // console.log("available quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };
  return (
    <div className="mb-12 py-6 border-top border-bottom">
      <div className="row align-items-center mb-6 mb-md-3">
        <div className="col-12 col-md-8 col-lg-6 mb-6 mb-md-0">
          <div className="row align-items-center">
            <i
              onClick={handleRemove}
              className="fa-sharp fa-solid fa-circle-xmark remove-cart"
            ></i>
            <div className="col-12 col-md-4 mb-3">
              <div
                className="d-flex align-items-center justify-content-center bg-light"
                style={{ width: 96, height: 128 }}
              >
                <img
                  className="img-fluid"
                  style={{ objectFit: "contain" }}
                  src={
                    p.product.images && p.product.images.length
                      ? p.product.images[0].url
                      : ""
                  }
                  alt="#"
                />
              </div>
            </div>
            <div className="col-8">
              <span className="mb-2 lead span">{p.product.title}</span>
            </div>
          </div>
        </div>
        <div className="d-none d-lg-block col-lg-2">
          <span className=" text-secondary text-decoration-line-through">
            {formatCash(`${p.product.price}`)}đ
          </span>
        </div>
        <div className="col-auto col-md-2">
          <div className="d-inline-flex align-items-center px-4 fw-bold text-secondary border rounded-2">
            <button className="btn px-0 py-2">
              <svg
                width={12}
                height={2}
                viewBox="0 0 12 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.35">
                  <rect
                    x={12}
                    width={2}
                    height={12}
                    transform="rotate(90 12 0)"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </button>
            <input
              className="form-control px-2 py-4 text-center text-md-end border-0"
              style={{ width: 48 }}
              type="number"
              placeholder={1}
              value={p.count}
              onChange={handleQuantityChange}
            />
            <button className="btn px-0 py-2">
              <svg
                width={12}
                height={12}
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.35">
                  <rect x={5} width={2} height={12} fill="currentColor" />
                  <rect
                    x={12}
                    y={5}
                    width={2}
                    height={12}
                    transform="rotate(90 12 5)"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
        <div className="col-auto col-md-2 text-end">
          <p className="text-secondary text-decoration-line-through">
            {formatCash(`${p.price * p.count}`)}đ
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCartInCheckOut;
