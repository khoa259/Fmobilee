import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";

import "./user.css";

import { getUserOrders } from "../../functions/user";
import { formatCash } from "../../component/formatCash";
import { useParams } from "react-router-dom";
const History = () => {
  const [order, setOrder] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    const { data } = getUserOrders(getToken, id).then((res) => {
      setOrder(res.data);
      return data;
    });
  }, []);
  console.log("order", order);

  return (
    <>
      <section>
        <div className="container">
          <h3>Đơn Hàng Của Tôi</h3>
        </div>
        {order?.products?.map((item, index) => (
          <div className="px-3">
            <div className="row header-box">
              <div className="col-6 date-order">
                <span>
                  Ngày đặt hàng: {dateFormat(order?.createdAt, "dd/mm/yyyy")}
                </span>
              </div>
              <div className="col-6 status-box">
                {/* <span>{order.status}</span> */}
              </div>
            </div>

            <div key={index}>
              <div className="row align-items-center purchase-box ">
                <div className="col-9 row align-items-center">
                  <div className="images-bills">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw0LDGrFJFTbhGUuXIf_PQ3TcQsThG8d-ZSA&usqp=CAU"
                      className="img-thumbnail"
                      width={150}
                    />
                  </div>
                  <div className="titlle-count-items mx-4">
                    <div className="title">
                      <span>{item?.title} </span>
                    </div>
                    <div className="count-items">
                      <span>{item.count}</span>
                    </div>
                  </div>
                </div>
                <div className="col-3 price-bill m-0">
                  {formatCash(`${item.price}`)}đ
                </div>
              </div>
            </div>
            <div className="row align-items-center ">
              <div className="col code-purcharse">
                Mã đơn hàng: {order.tradingCode}
              </div>
              <div className="col toltal-price">
                Tổng tiền: {formatCash(`${order.billTotal}`)}VNĐ
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
export default History;
