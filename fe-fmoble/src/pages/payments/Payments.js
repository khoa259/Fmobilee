import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Modal, Result } from "antd";

import "./payment.css";

import { formatCash } from "../../component/formatCash";
import { getUserCart } from "../../functions/user";
import { createBill } from "../../functions/Bill";
import { getAddressSesstionStorage } from "../../utils/functionHelp";
//load stripe outside of components render to avoid
const Payments = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { handleSubmit, register, reset } = useForm();
  const { email } = user;
  const urlPaymentReturn = window.location.search;
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState(
    JSON.parse(sessionStorage.getItem("address"))
  );
  const [idCart, setIdCard] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalFail, setisModalFail] = useState(false);
  const navigate = useNavigate();

  //call APi return Vnpay
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/order/vnpay_return${urlPaymentReturn}`)
      .then((res) => {
        const getToken = localStorage.getItem("token");
        getUserCart(getToken).then((res) => {
          setProducts(res.data.products);
          setIdCard(res.data._id);
          reset({ ...res.data.products, address });
          console.log("res.data", res.data);
        });
      });

    // setAddress(sessionStorage.getItem("address"));
  }, []);
  console.log("getAddressLocalStorage", address.username);
  console.log("products", products);
  // get value in url
  const myKeyValue = window.location.search;
  const urlParams = new URLSearchParams(myKeyValue);
  const vnp_Amount = urlParams.get("vnp_Amount");
  const vnp_CardType = urlParams.get("vnp_CardType");
  const vnp_PayDate = urlParams.get("vnp_PayDate");
  const vnp_TransactionNo = urlParams.get("vnp_TransactionNo");

  //Handle SUbmit form
  const onSubmit = async (data) => {
    console.log("data", data);
    const newData = {
      ...data,
      tradingCode: vnp_TransactionNo,
      cardType: vnp_CardType,
      orderdBy: user._id,
      idCart: idCart,
      username: address.username,
      email: address.email,
      phoneNumber: address.phoneNumber,
      address: address.address,
      products: products.map((product) => product.product),
      images: products.map((product) => product.images),
      color: products.map((product) => product.color),
    };
    console.log(newData);
    const status = await createBill(newData);
    if (status === 200) {
      showModal();
    } else {
      showModalFail();
    }
  };
  const showModalFail = () => {
    setisModalFail(true);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/");
  };
  const handleOkFail = () => {
    setisModalFail(false);
    navigate("/");
  };

  const handleCancelFail = () => {
    setisModalFail(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Result
          status="success"
          title="Đơn hàng đã được xác nhận thành công"
          subTitle="Đơn hàng của quý khách đã được xác nhận thành công, cùng mua sắm tiếp nhé"
          extra={[<Button key="buy">Mua tiếp</Button>]}
        />
        ;
      </Modal>
      <Modal open={isModalFail} onOk={handleOkFail} onCancel={handleCancelFail}>
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
          extra={
            <Link to={"/"}>
              <Button type="primary">Back Home</Button>
            </Link>
          }
        />
      </Modal>
      <div className="container p-5 ">
        <h2 className="text-center">Đơn Hàng Thanh Toán</h2>
        <div className="pt-4 shadow p-3 mb-5 bg-white rounded">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-8 offset-md-2">
              {products &&
                products?.map((p, i) => (
                  <div className="row" key={i}>
                    <div className="col-lg-2 ">
                      <img
                        src={p.images && p.images.length ? p.images[0].url : ""}
                        style={{ height: "80px", objectFit: "cover" }}
                        className="m-2"
                      />
                      <input
                        className="input-bill-title"
                        type="text"
                        {...register("images")}
                        // value={p?.images[0]}
                      />
                    </div>
                    <div className="col-lg-7 ">
                      <input
                        className="input-bill-title"
                        type="text"
                        {...register("title")}
                        value={p?.product?.title}
                      />{" "}
                      <br />
                      màu :
                      <input
                        className="input-bill-title"
                        type="text"
                        {...register("color")}
                        value={p?.color}
                      />{" "}
                      <br />
                      X
                      <input
                        className="input-bill-title"
                        type="text"
                        {...register("count")}
                        value={p?.count}
                      />
                    </div>
                    <div className="col-lg-3">
                      <input
                        className="input-bill-title"
                        type="text"
                        {...register("price")}
                        value={formatCash(`${p?.product?.price * p?.count}`)}
                      />
                      <br />
                    </div>
                    <br />
                  </div>
                ))}

              <div>
                <span className="bill">
                  Tên người đặt hàng
                  <input
                    className="input-bill"
                    type="text"
                    {...register("username")}
                    value={address?.username}
                  />
                </span>
                <br />
                <span className="bill">
                  Email:
                  <input
                    className="input-bill"
                    type="text"
                    {...register("email")}
                    value={address?.email}
                  />
                </span>
                <br />
                <span className="bill">
                  Số điện thoại {address?.phoneNumber}
                </span>
                <br />
                <span className="bill">
                  Địa chỉ: {address?.address}
                  {/* <input
                    className="input-bill"
                    type="text"
                    {...register("email")}
                    value={convertAddress?.address}
                  /> */}
                </span>
              </div>

              <div>
                <span className="bill">
                  <input
                    className="input-bill"
                    type="text"
                    {...register("status")}
                    value={"6391f4358e713e3070f753bb"}
                    hidden
                  />
                </span>
              </div>

              <hr />
              <div>
                <div>
                  <span className="bill">
                    Phương thức thanh toán:
                    <input
                      className="input-bill"
                      type="text"
                      {...register("cardType")}
                      value={vnp_CardType}
                    />
                  </span>
                </div>
                <div>
                  <span className="bill">
                    Mã giao dịch:
                    <input
                      className="input-bill"
                      type="text"
                      {...register("tradingCode")}
                      value={vnp_TransactionNo}
                    />
                  </span>
                </div>
                <div>
                  <span className="bill">
                    <input
                      className="input-bill"
                      type="text"
                      {...register("timePayment")}
                      value={vnp_PayDate}
                      hidden
                    />
                  </span>
                </div>
              </div>
              <div className="row mt-3 ">
                <div className="col-lg-9 col-2">
                  <span className="bill">Tổng hóa đơn thanh toán</span>
                </div>
                <div className="col-3 text-success">
                  <input
                    className="input-bill-total"
                    type="number"
                    {...register("billTotal")}
                    value={vnp_Amount / 100}
                  />
                </div>
              </div>
              <div className="text-center mt-5">
                <button className="btn btn-success text-center rounded">
                  Xác nhận thanh toán
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payments;
