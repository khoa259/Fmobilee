import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { formatCash } from "../../component/formatCash";
import ProductCartInCheckOut from "../../component/cards/productCartInCheckOut";
import { getUserCart } from "../../functions/user";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const [load, setLoad] = useState(0);
  const [dataCart, setDataCart] = useState({ products: [], idCart: "" });
  const { user, cart } = useSelector((state) => ({ ...state }));
  const history = useNavigate();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  // const getTotalCart = () => {
  //   const ship = 22000;
  //   if (cart.length !== 0) {
  //     return getTotal() + ship;
  //   }
  //   return getTotal();
  // };

  const redirectCheckout = () => {
    history("/thanh-toan");
  };

  useEffect(() => {
    const getToken = localStorage.getItem("token");

    getUserCart(getToken).then((res) => {
      console.log(res.data);
      setDataCart({ ...res.data, idCart: res.data._id });
      let totalCard = 0;
      setTotal(
        res.data.products.map(
          (i) => (totalCard += +i?.product?.price * +i?.count)
        )
      );
      setTotal(totalCard);
    });
  }, [load]);
  const { products, idCart } = dataCart;
  console.log(dataCart);
  console.log("products", products.po);
  return (
    <div>
      <section className="py-20 pt-5 ">
        <div className="container">
          <div className="p-8 p-lg-20 ">
            <h2 className="mb-8 mb-md-20">
              Giỏ Hàng / {products.length} Sản phẩm
            </h2>
            {!products.length ? (
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
                        style={{ fontSize: 16 }}
                      >
                        Thông tin sản phẩm
                      </span>
                    </div>
                    <div className="col-12 col-lg-2">
                      <span
                        className="mb-6 text-secondary"
                        style={{ fontSize: 16 }}
                      >
                        Giá tiền
                      </span>
                    </div>
                    <div className="col-12 col-lg-2 text-center">
                      <span
                        className="mb-6 text-secondary"
                        style={{ fontSize: 16 }}
                      >
                        Số lượng
                      </span>
                    </div>
                    <div className="col-12 col-lg-2 text-end">
                      <span
                        className="mb-6 text-secondary"
                        style={{ fontSize: 16 }}
                      >
                        Tổng
                      </span>
                    </div>
                  </div>
                  <hr />
                  {products.map((p) => (
                    <ProductCartInCheckOut
                      key={p._id}
                      p={p}
                      idCart={idCart}
                      load={load}
                      setLoad={setLoad}
                      total={total}
                    />
                  ))}
                </div>
                <div className="col-md-4 h-50  ">
                  <h4>Thanh Toán</h4>
                  <hr />
                  <p>Giá tiền :</p>
                  {products.map((p, i) => (
                    <div className="d-flex justify-content-between" key={i}>
                      <p>{p.product.title}</p>
                      <b className="text-danger">
                        {formatCash(`${p.product.price * p?.count}`)}đ
                      </b>
                    </div>
                  ))}
                  {/* <div
                    className="d-flex justify-content-between
                  ">
                    <p>Phí Vận Chuyển :</p>
                    <b className="text-danger">22.000đ</b>
                  </div> */}

                  <hr />
                  <div
                    className="d-flex justify-content-between
                  "
                  >
                    <h5>Tổng tiền:</h5>
                    <b className=" text-danger">{formatCash(`${total}`)}đ</b>
                  </div>
                  <button
                    className="btn btn-md btn-primary mt-3"
                    onClick={redirectCheckout}
                  >
                    Thanh Toán
                  </button>
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
