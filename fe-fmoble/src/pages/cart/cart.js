import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatCash } from "../../component/formatCash";
import ModalImage from "react-modal-image";

const Cart = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const getTotalCart = () => {
    const ship = 22000;
    if (cart.length != 0) {
      return getTotal() + ship;
    }
    return getTotal();
  };

  return (
    <div>
      {/* {JSON.stringify(cart)} */}
      <section className="py-20 pt-5 ">
        <div className="container">
          <div className="p-8 p-lg-20 ">
            <h2 className="mb-8 mb-md-20">Giỏ Hàng / {cart.length} Sản phẩm</h2>
            <div className="row ">
              <div className="col-12 col-xl-8 mb-8 mb-xl-0">
                <div className="d-none d-lg-flex row">
                  <div className="col-12 col-lg-6">
                    <span
                      className="mb-6 text-secondary"
                      style={{ fontSize: 16 }}>
                      Thông tin sản phẩm
                    </span>
                  </div>
                  <div className="col-12 col-lg-2">
                    <span
                      className="mb-6 text-secondary"
                      style={{ fontSize: 16 }}>
                      Giá tiền
                    </span>
                  </div>
                  <div className="col-12 col-lg-2 text-center">
                    <span
                      className="mb-6 text-secondary"
                      style={{ fontSize: 16 }}>
                      Số lượng
                    </span>
                  </div>
                  <div className="col-12 col-lg-2 text-end">
                    <span
                      className="mb-6 text-secondary"
                      style={{ fontSize: 16 }}>
                      Tổng
                    </span>
                  </div>
                </div>
                <hr />
                <div className="mb-12 py-6 border-top border-bottom">
                  {cart.map((c, index) => (
                    <div
                      className="row align-items-center mb-6 mb-md-3"
                      key={index}>
                      <div className="col-12 col-md-8 col-lg-6 mb-6 mb-md-0">
                        <div className="row align-items-center">
                          <div className="col-12 col-md-4 mb-3">
                            <div
                              className="d-flex align-items-center justify-content-center bg-light"
                              style={{ width: 96, height: 128 }}>
                              <img
                                className="img-fluid"
                                style={{ objectFit: "contain" }}
                                src={
                                  c.images && c.images.length
                                    ? c.images[0].url
                                    : ""
                                }
                                alt
                              />
                              <ModalImage
                                small={c.images[0].url}
                                large={c.images[0].url}
                              />
                            </div>
                          </div>
                          <div className="col-8">
                            <span className="mb-2 lead span">{c.title}</span>
                          </div>
                        </div>
                      </div>
                      <div className="d-none d-lg-block col-lg-2">
                        <span className=" text-secondary text-decoration-line-through">
                          {formatCash(`${c.price}`)}đ
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
                        <p className="text-secondary text-decoration-line-through">
                          {formatCash(`${c.price}`)}đ
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <hr />
              </div>
              <div className="col-md-4 h-50  ">
                <h4>Thanh Toán</h4>
                <hr />
                <div
                  className="d-flex justify-content-between
                  ">
                  <p>Giá tiền :</p>
                  <b className="text-danger">{formatCash(`${getTotal()}`)}đ</b>
                </div>
                {cart.length != 0 && (
                  <div
                    className="d-flex justify-content-between
                  ">
                    <p>Phí Vận Chuyển :</p>
                    <b className="text-danger">22.000đ</b>
                  </div>
                )}
                <hr />

                <div
                  className="d-flex justify-content-between
                  ">
                  <h5>Tổng tiền:</h5>
                  <b className=" text-danger">
                    {formatCash(`${getTotalCart()}`)}đ
                  </b>
                </div>
                {user.email ? (
                  <button className="btn btn-md btn-primary mt-3">
                    Checkout with {user.email}
                  </button>
                ) : (
                  <button className="btn btn-sm btn-primary mt-3">
                    Login to Checkout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
