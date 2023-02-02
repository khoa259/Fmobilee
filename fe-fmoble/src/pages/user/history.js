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
  console.log("order", JSON.stringify(order, null, 2));

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
            {order?.map((item, index) =>
              item.products.map((product, idx) => (
                <div className="px-3 mt-4" key={idx}>
                  <div className="row header-box">
                    <div className="col-6 date-order">
                      <span>
                        Ngày đặt hàng:{" "}
                        {dateFormat(item?.createdAt, "dd/mm/yyyy")}
                      </span>
                    </div>
                    <div className="col-6 status-box">
                      <span>Trạng thái: {item?.status?.name}</span>
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
                            <span className="span">{product?.title} </span>
                          </div>
                          <div className="count-items">
                            <span>SL: {item.count}</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-3 price-bill m-0">
                        <span>{formatCash(`${product.price}`)}đ</span>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center ">
                    <div className="col code-purcharse">
                      Mã đơn hàng: {item.tradingCode}
                    </div>
                    <div className="col toltal-price">
                      Tổng tiền: {formatCash(`${item.billTotal}`)}VNĐ
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </>
  );
};
export default History;
