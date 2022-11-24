import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { formatCash } from "../../component/formatCash";
import ProductCartInCheckOut from "../../component/cards/productCartInCheckOut";

const Cart = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));
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
            {!cart.length ? (
              <p>
                Không có sản phẩm nào trong giỏ hàng{" "}
                <Link className="text-success" to="/">
                  Tiếp tục mua hàng
                </Link>
              </p>
            ) : (
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
                  {cart.map((p) => (
                    <ProductCartInCheckOut key={p._id} p={p} />
                  ))}
                </div>
                <div className="col-md-4 h-50  ">
                  <h4>Thanh Toán</h4>
                  <hr />
                  <div
                    className="d-flex justify-content-between
                  ">
                    <p>Giá tiền :</p>
                    <b className="text-danger">
                      {formatCash(`${getTotal()}`)}đ
                    </b>
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
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
