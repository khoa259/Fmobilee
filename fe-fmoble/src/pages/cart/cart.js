import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCash } from "../../component/formatCash";

const Cart = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  return (
    <div>
      {JSON.stringify(cart)}
      {/* <section className="py-20  overflow-hidden">
        <div className="container">
          <div className="p-8 p-lg-20 ">
            <h2 className="mb-8 mb-md-20">Your cart</h2>
            <div className=" align-items-center">
              <div className="col-xl-12 col-md-8  mb-8 mb-xl-0">
                <div className="d-none d-lg-flex row">
                  <div className="col-12 col-lg-6">
                    <h4
                      className="mb-6 text-secondary"
                      style={{ fontSize: 16 }}>
                      Description
                    </h4>
                  </div>
                  <div className="col-12 col-lg-2">
                    <h4
                      className="mb-6 text-secondary"
                      style={{ fontSize: 16 }}>
                      Price
                    </h4>
                  </div>
                  <div className="col-12 col-lg-2 text-center">
                    <h4
                      className="mb-6 text-secondary"
                      style={{ fontSize: 16 }}>
                      Quantity
                    </h4>
                  </div>
                  <div className="col-12 col-lg-2 text-end">
                    <h4
                      className="mb-6 text-secondary"
                      style={{ fontSize: 16 }}>
                      Subtotal
                    </h4>
                  </div>
                </div>
                <div className="mb-12 py-6 border-top border-bottom">
                  <div className="row align-items-center mb-6 mb-md-3">
                    <div className="col-12 col-md-8 col-lg-6 mb-6 mb-md-0">
                      <div className="row align-items-center">
                        <div className="col-12 col-md-4 mb-3">
                          <div
                            className="d-flex align-items-center justify-content-center bg-light"
                            style={{ width: 96, height: 128 }}>
                            <img
                              className="img-fluid"
                              style={{ objectFit: "contain" }}
                              src="yofte-assets/images/waterbottle.png"
                              alt
                            />
                          </div>
                        </div>
                        <div className="col-8">
                          <h3 className="mb-2 lead fw-bold">
                            BRILE water filter carafe
                          </h3>
                          <p className="mb-0 text-secondary">
                            Maecenas 0.7 commodo sit
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="d-none d-lg-block col-lg-2">
                      <p className="mb-0 lead fw-bold text-info">$29.89</p>
                      <span className="small text-secondary text-decoration-line-through">
                        $33.69
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
                            xmlns="http://www.w3.org/2000/svg">
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
                        />
                        <button className="btn px-0 py-2">
                          <svg
                            width={12}
                            height={12}
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.35">
                              <rect
                                x={5}
                                width={2}
                                height={12}
                                fill="currentColor"
                              />
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
                      <p className="lead fw-bold text-info">$29.89</p>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-8 col-lg-6 mb-6 mb-md-0">
                      <div className="row align-items-center">
                        <div className="col-12 col-md-4 mb-3">
                          <div
                            className="d-flex align-items-center justify-content-center bg-light"
                            style={{ width: 96, height: 128 }}>
                            <img
                              className="img-fluid"
                              style={{ objectFit: "contain" }}
                              src="yofte-assets/images/basketball.png"
                              alt
                            />
                          </div>
                        </div>
                        <div className="col-8">
                          <h3 className="mb-2 lead fw-bold">
                            Nike basketball ball
                          </h3>
                          <p className="mb-0 text-secondary">
                            Maecenas 0.7 commodo sit
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="d-none d-lg-block col-lg-2">
                      <p className="mb-0 lead fw-bold text-info">$29.89</p>
                      <span className="small text-secondary text-decoration-line-through">
                        $33.69
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
                            xmlns="http://www.w3.org/2000/svg">
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
                        />
                        <button className="btn px-0 py-2">
                          <svg
                            width={12}
                            height={12}
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.35">
                              <rect
                                x={5}
                                width={2}
                                height={12}
                                fill="currentColor"
                              />
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
                      <p className="lead fw-bold text-info">$29.89</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <div className="container-fluid pt-2">
        <div className="row">
          <div className="col-md-8">
            <h4>Cart / {cart.length} Product</h4>

            {!cart.length ? (
              <p>
                No products in cart. <Link to="/shop">Continue Shopping.</Link>
              </p>
            ) : (
              "show cart items"
            )}
          </div>
          <div className="col-md-4">
            <h4>Order Summary</h4>
            <hr />
            <p>Products</p>
            {cart.map((c, i) => (
              <div key={i}>
                <p>
                  {c.title} x {c.count} = ${c.price * c.count}
                </p>
              </div>
            ))}
            <hr />
            Total: <b>${getTotal()}</b>
            <hr />
            {user ? (
              <button className="btn btn-sm btn-primary mt-2">
                Proceed to Checkout
              </button>
            ) : (
              <button className="btn btn-sm btn-primary mt-2">
                Login to Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
