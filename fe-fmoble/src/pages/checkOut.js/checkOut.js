import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { formatCash } from "../../component/formatCash";
import { getUserCart } from "../../functions/user";
import { setAddressLocalStorage } from "../../utils/functionHelp";
import "./checkOut.css";

const CheckOut = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getToken = localStorage.getItem("token");
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

  const onSubmit = (e) => {
    axios
      .post("http://localhost:8000/api/order/create_payment_url", {
        amount: total,
        e,
      })
      .then((res) => {
        console.log((window.location.href = res.data.url));
      });

    console.log("payment", e);
    setAddressLocalStorage(e?.address);
    console.log("amount", total);
  };

  return (
    <div className="container ">
      <div>
        <div className="py-5 text-center">
          <h2>Thanh Toán Đơn Hàng</h2>
        </div>
        <div className="row shadow p-5 mb-5 bg-white rounded">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Giỏ hàng</span>
              <span className="badge badge-secondary badge-pill"></span>
            </h4>

            <ul className="list-group mb-3">
              {products.map((p, i) => (
                <div key={i}>
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <b className="my-0">{p.product.title}</b>
                      <div>
                        <label>Số lượng:</label>
                        <span className="my-0">{p?.count}</span>
                      </div>
                    </div>
                    <span className="text-muted">
                      {formatCash(`${p.product.price * p?.count}`)}đ
                    </span>
                  </li>
                </div>
              ))}

              <li className="list-group-item d-flex justify-content-between">
                <span>Tổng tiền (VNĐ)</span>
                <strong className="h5">{formatCash(`${total}`)}đ</strong>
              </li>
              {/* <span className="text-primary pl-2" onClick={emptyCart}>
              Xóa toàn bộ đơn hàng
            </span> */}
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
            <form
              className="needs-validation"
              onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-xl-12 mb-4">
                  <label htmlFor="firstName">Họ Tên</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Họ Tên"
                    {...register("userName", { required: true })}
                  />
                  {errors.userName && (
                    <p className=" text-validate">Họ tên không được bỏ trống</p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="email">
                  Email <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="you@gmail.com"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                  <p className=" text-validate">Email không được bỏ trống</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email">
                  Số điện thoại <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="phoneNumber"
                  placeholder="0123456789"
                  {...register("phoneNumber", {
                    required: true,
                    pattern: /(84|0[3|5|7|8|9])+([0-9]{8})/,
                  })}
                />
                {errors.phoneNumber?.type === "required" && (
                  <p className=" text-validate">
                    Số điện thoại không được bỏ trống
                  </p>
                )}
                {errors.phoneNumber?.type === "pattern" && (
                  <p className=" text-validate">Không đúng định dạng</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="address">Địa chỉ</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Địa chỉ..."
                  {...register("address", { required: true, maxLength: 500 })}
                />
                {errors.address?.type === "required" && (
                  <p className=" text-validate">
                    Địa chỉ nhận hàng không được bỏ trống
                  </p>
                )}
                {errors.address?.type === "maxLength" && (
                  <p className=" text-validate">Quá 500 ký tự</p>
                )}
              </div>
              <button className="btn btn-primary btn-lg btn-block">
                thanh toán
              </button>
              {/* </Link> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
