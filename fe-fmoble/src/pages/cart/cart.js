import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
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
      <section className="h-100 ">
        <div className="container py-5">
          <div className="  my-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Giỏ hàng - {cart.length} sản phẩm</h5>
              </div>
              <div className="card-body">
                {/* Single item */}
                <div className="row">
                  <div className="col-xl-3  mb-4 mb-lg-0">
                    {/* Image */}
                    <div className="bg-image hover-overlay hover-zoom ripple rounded">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"
                        className="w-100"
                        alt="Blue Jeans Jacket"
                      />
                    </div>
                    {/* Image */}
                  </div>
                  <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                    {/* Data */}
                    <p>
                      <strong></strong>
                    </p>
                    <p>Color: blue</p>
                    <p>Size: M</p>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm me-1 mb-2"
                      data-mdb-toggle="tooltip"
                      title="Remove item">
                      <i className="fas fa-trash" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm mb-2"
                      data-mdb-toggle="tooltip"
                      title="Move to the wish list">
                      <i className="fas fa-heart" />
                    </button>
                    {/* Data */}
                  </div>
                  <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                    {/* Quantity */}
                    <div className="d-flex mb-4" style={{ maxWidth: 100 }}>
                      <button className="">
                        <i className="fas fa-minus" />
                      </button>
                      <div className="form-outline">
                        <input
                          id="form1"
                          min={0}
                          name="quantity"
                          defaultValue={1}
                          type="number"
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="form1">
                          Quantity
                        </label>
                      </div>
                      <button className=" ">
                        <i className="fas fa-plus" />
                      </button>
                    </div>

                    <p className="text-start ">
                      <strong>$17.99</strong>
                    </p>
                    {/* Price */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
