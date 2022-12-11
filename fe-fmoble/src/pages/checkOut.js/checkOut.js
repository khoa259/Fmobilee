import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

import "./checkOut.css";
import { formatCash } from "../../component/formatCash";
import {
  emptyUserCart,
  getUserCart,
  saveUserAddress,
} from "../../functions/user";
import { getAddress } from "../../functions/address";
import { Link } from "react-router-dom";
import { Select } from "antd";

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
  const [savedAdress, setSavedAdress] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  // const getToken = localStorage.getItem("token");
  // console.log(getToken);

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    console.log(getToken);
    getUserCart(getToken).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
    // const getAddressData = () => {
    //   axios.get("https://provinces.open-api.vn/api/").then((res) => {
    //     let lstProvince = [];
    //     res.data.forEach((item) => {
    //       lstProvince.push({
    //         value: item.code,
    //         label: item.name,
    //       });
    //     });
    //     setProvince(lstProvince);
    //   });
    // };
    // getAddressData();
  }, []);

  // const onchangeProvince = (e) => {
  //   axios.get(`https://provinces.open-api.vn/api/p/${1}`).then((res) => {
  //     let lstDistrict = [];
  //     res.data[0].districts.forEach((item) => {
  //       lstDistrict.push({
  //         value: item.code,
  //         label: item.name,
  //       });
  //     });
  //     setDistrict(lstDistrict);
  //   });
  // };

  const emptyCart = () => {
    if (window.confirm("đơn hàng của bạn sẽ bị xóa ")) {
      // remove from local storage
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
      // remove from redux
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
  // const saveAddressToDB = (data) => {
  //   console.log(data);
  //   // saveUserAddress(user.token, address).then((res) => {});
  //   saveUserAddress(user.token, data).then((res) => {
  //     console.log("res.data", res);
  //     if (res.data) {
  //       setAddress(data);
  //       toast.success("Address saved");
  //       console.log(res.data);
  //     }
  //   });
  // };
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
      {JSON.stringify(getAddress)}
      <div className="py-5 text-center">
        <h2>Thanh Toán Đơn Hàng</h2>
      </div>
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          {/* {JSON.stringify(products)} */}
          {/* bug ở đây---- bạn xử lý thêm nhé */}

          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Giỏ hàng</span>
            <span className="badge badge-secondary badge-pill"></span>
          </h4>
          <ul className="list-group mb-3">
            {products.map((p, i) => (
              <li
                className="list-group-item d-flex justify-content-between lh-condensed"
                key={i}>
                <div>
                  <b className="my-0">{p.product.title}</b>
                </div>
                <span className="text-muted">
                  {formatCash(`${p.product.price * p.count}`)} đ
                </span>
              </li>
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
              <strong>{formatCash(`${total}`)}đ</strong>
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
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="country">Thành phố/Tỉnh</label>
                <br />
                {/* <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                  {...register("country", { required: true })}
                /> */}
                <Select style={{ width: 200 }} options={Province} />
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state">Quận/Huyện</label>
                <br />
                {/* <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                  {...register("district", { required: true })}
                /> */}
                <Select style={{ width: 200 }} options={District} />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="zip">Phường/Xã</label>
                <br />
                {/* <input
                  type="text"
                  className="form-control"
                  id="zip"
                  placeholder="Phường Xã"
                  {...register("ward", { required: true })}
                /> */}
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
            </div>
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

            {/* ghi chu */}
            {/* <div className="mb-3">
              <label htmlFor="address">Ghi chú</label>
              <ReactQuill theme="snow" value={}/>
            </div> */}

            {/* Thong tin thanh toan */}

            {/* <hr className="mb-4" />
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="same-address"
              />
              <label className="custom-control-label" htmlFor="same-address">
                Shipping address is the same as my billing address
              </label>
            </div>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="save-info"
              />
              <label className="custom-control-label" htmlFor="save-info">
                Save this information for next time
              </label>
            </div>
            <hr className="mb-4" /> */}
            {/* <h4 className="mb-3">Thanh toán online</h4> */}
            {/* <div className="d-block my-3">
              <div className="custom-control custom-radio">
                <input
                  id="credit"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                  defaultChecked
                  required
                />
                <label className="custom-control-label" htmlFor="credit">
                  Credit card
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  id="debit"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                  required
                />
                <label className="custom-control-label" htmlFor="debit">
                  Debit card
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  id="paypal"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                  required
                />
                <label className="custom-control-label" htmlFor="paypal">
                  PayPal
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="cc-name">Name on card</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-name"
                  placeholder="Tên Chủ Thẻ"
                  required
                />
                <small className="text-muted">
                  Full name as displayed on card
                </small>
                <div className="invalid-feedback">Name on card is required</div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="cc-number">Credit card number</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-number"
                  placeholder="Số Thẻ"
                  required
                />
                <div className="invalid-feedback">
                  Credit card number is required
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="cc-expiration">Expiration</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-expiration"
                  required
                />
                <div className="invalid-feedback">Expiration date required</div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="cc-cvv">CVV</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-cvv"
                  required
                />
                <div className="invalid-feedback">Security code required</div>
              </div>
            </div>
            <hr className="mb-4" /> */}

            {/* <Link to={"/payments"}> */}
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
