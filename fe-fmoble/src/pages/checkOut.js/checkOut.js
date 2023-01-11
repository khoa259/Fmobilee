import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { formatCash } from "../../component/formatCash";
import { getAddress } from "../../functions/address";
import { emptyUserCart, getUserCart } from "../../functions/user";
import "./checkOut.css";

const CheckOut = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [products, setProducts] = useState([]);
  const [Province, setProvince] = useState([]);
  const [District, setDistrict] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    const getToken = localStorage.getItem("token");
    console.log(getToken);
    getUserCart(getToken).then((res) => {
      setProducts(res.data.products);
      let totalCard = 0;
      setTotal(
        res.data.products.map(
          (i) => (totalCard += +i?.product?.price * +i?.count)
        )
      );
      setTotal(totalCard);
    });
  }, []);
  console.log("products", products);

  const emptyCart = () => {
    if (window.confirm("đơn hàng của bạn sẽ bị xóa ")) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });
      // remove from backend
      emptyUserCart(user.token).then((res) => {
        console.log(products);
        setProducts([]);
        setTotal(0);
        toast.success("đơn hàng của bạn đã xóa thành công");
      });
    }
  };
  const onSubmit = (e) => {
    axios
      .post("http://localhost:8000/api/order/create_payment_url", {
        amount: total,
      })
      .then((res) => {
        window.location.href = res.data.url;
      });
  };

  return (
    <div className="container">
      <div className="py-5 text-center">
        <h2>Thanh Toán Đơn Hàng</h2>
      </div>
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Giỏ hàng</span>
            <span className="badge badge-secondary badge-pill"></span>
          </h4>

          <ul className="list-group mb-3">
            {products.map((p, i) => (
              <>
                <li
                  className="list-group-item d-flex justify-content-between lh-condensed"
                  key={i}
                >
                  <div>
                    <b className="my-0">{p.product.title}</b>
                  </div>

                  <span className="text-muted">
                    {formatCash(`${p.product.price * p?.count}`)}đ
                  </span>
                </li>
                <li
                  className="list-group-item d-flex justify-content-between lh-condensed"
                  key={i}
                >
                  <div>
                    <label>Số lượng:</label>
                    <span className="my-0">{p?.count}</span>
                  </div>
                </li>
              </>
            ))}

            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                <h6 className="my-0">Mã giảm giá</h6>
                <small>EXAMPLECODE</small>
              </div>
              <span className="text-success">-$5</span>
            </li>

            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>{formatCash(`${total}`)}</strong>
            </li>
            <span className="text-primary pl-2" onClick={emptyCart}>
              Xóa toàn bộ đơn hàng
            </span>
          </ul>

          <form className="card p-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Mã giảm giá..."
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-primary">
                  Áp dụng
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* ------------Thong tin dat hang----------------- */}
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Thông Tin Đặt hàng</h4>
          <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-xl-12 mb-3">
                <label htmlFor="firstName">Họ Tên</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Họ Tên"
                  {...register("name", { required: true })}
                  required
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                Email <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
                {...register("email", { required: true })}
              />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                Số điện thoại <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="phoneNumber"
                placeholder="0123456789"
                {...register("phoneNumber", { required: true })}
              />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="country">Thành phố/Tỉnh</label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                  {...register("country", { required: true })}
                />
                <Select style={{ width: 200 }} options={Province} />
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state">Quận/Huyện</label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                  {...register("district", { required: true })}
                />
                <Select style={{ width: 200 }} options={District} />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="zip">Phường/Xã</label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  placeholder="Phường Xã"
                  {...register("ward", { required: true })}
                />
                <Select
                  defaultValue="lucy"
                  style={{ width: 200 }}
                  options={[
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                  ]}
                />
                <div className="invalid-feedback">Zip code required.</div>
              </div>
            </div> */}
            <div className="mb-3">
              <label htmlFor="address">Địa chỉ</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="1234 Main St"
                required
              />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <button className="btn btn-primary btn-lg btn-block">
              Continue to checkout
            </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
