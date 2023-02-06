import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";

import "./user.css";

import { getUserOrders } from "../../functions/user";
import { formatCash } from "../../component/formatCash";
import { useParams } from "react-router-dom";
import { updateProduct } from "../../functions/products";
import axios from "axios";
import { Button } from "antd";
const History = () => {
  const [order, setOrder] = useState([]);
  const [statusBill, setStatusBill] = useState("");
  const { id } = useParams();

  const getToken = localStorage.getItem("token");
  useEffect(() => {
    const { data } = getUserOrders(getToken, id).then((res) => {
      setOrder(res.data);
      setStatusBill("");
      return data;
    });
  }, [statusBill]);

  const cancelBill = (id) => {
    console.log("id", id);
    const confirm = window.confirm("Bạn có muốn hủy đơn hàng?");
    if (confirm) {
      axios.put(`http://localhost:8000/api/bill/${id}`, {
        status: "6391f48b8e713e3070f753c3",
      });
      setStatusBill("update");
    }

    // updateProduct(id, { status: "6391f48b8e713e3070f753c3" }, getToken);
  };

  console.log("history", order);
  return (
    <>
      <section>
        <div className="container">
          <h3>Đơn Hàng Của Tôi</h3>
        </div>
        {!order.length ? (
          <span>Chưa có đơn hàng nào được thanh toán</span>
        ) : (
          <div>
            {order?.map((item, index) => (
              <div className="px-3 py-4 mt-4 bg-blue" key={index}>
                <div className="row header-box">
                  <div className="col-6 date-order">
                    <span>
                      Ngày đặt hàng:{" "}
                      {dateFormat(item?.createdAt, "dd/mm/yyyy - HH:MM")}
                    </span>
                  </div>
                  <div className="col-6 status-box">
                    <span>Trạng thái: {item?.status?.name}</span>
                  </div>
                </div>
                {item.products.map((product, idx) => {
                  return (
                    <div key={idx}>
                      <div className="row align-items-center purchase-box ">
                        <div className="col-9 row align-items-center">
                          {item.images[idx].slice(0, 1).map((img, i) => (
                            <div className="images-bills" key={i}>
                              <img
                                src={`${img.url}`}
                                className="img-thumbnail"
                                width={150}
                              />
                            </div>
                          ))}
                          <div className="titlle-count-items mx-4">
                            <div className="title">
                              <span className="span">{product?.title} </span>
                            </div>
                            <div className="count-items">
                              <span>
                                SL:
                                {item.cardType !== "ATM"
                                  ? "3"
                                  : `${item.count}`}{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-3 price-bill m-0">
                          <span>{formatCash(`${product.price}`)}đ</span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="row align-items-center ">
                  <div className="col code-purcharse">
                    Mã đơn hàng: {item.tradingCode} <br />
                    Phương thức thanh toán:
                    <span className="h5">
                      {item.cardType === "ATM" ? "Payment" : "COD"}
                    </span>
                  </div>

                  <div className="col toltal-price">
                    Tổng tiền: {formatCash(`${item.billTotal}`)}VNĐ
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <div>
                    {item?.status?.name == "Giao thành công" ||
                    item?.status?.name == "Đã hủy" ? null : (
                      <div className="button-cancel-bill">
                        <Button danger onClick={() => cancelBill(item._id)}>
                          Hủy đơn hàng
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <br />
      </section>
    </>
  );
};
export default History;
