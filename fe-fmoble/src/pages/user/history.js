import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";

import "./user.css";

import { getUserOrders } from "../../functions/user";
import { formatCash } from "../../component/formatCash";
const History = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    const { data } = getUserOrders(getToken).then((res) => {
      console.log("orderBy", JSON.stringify(res.data, null, 4));
      setOrder(res);
      return data;
    });
  }, []);
  console.log("orderBy", order);
  return (
    <section>
      <div className="container">
        <h3>Đơn Hàng Của Tôi</h3>
      </div>
      <div className="px-3">
        <div className="row header-box">
          <div className="col-6 date-order">
            <span>Ngày đặt hàng: {dateFormat(new Date(), "dd/mm/yyyy")}</span>
          </div>
          <div className="col-6 status-box">
            <span>Trạng thái đơn hàng: Chờ xác nhận</span>
          </div>
        </div>

        <div className="row align-items-center purchase-box">
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
                <span>Iphone 12 ProMax 256GB</span>
              </div>
              <div className="count-items">
                <span>SL: 1</span>
              </div>
            </div>
          </div>
          <div className="col-3 price m-0 ">18.000.0000 đ</div>
        </div>
        <div className="row align-items-center ">
          <div className="col code-purcharse">Mã đơn hàng: 23654526295</div>
          <div className="col toltal-price">Tổng tiền: 18.000.000 đ</div>
        </div>
      </div>
    </section>
  );
};
export default History;
