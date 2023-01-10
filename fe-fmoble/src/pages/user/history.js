import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";

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
      <section>
        <div className=" py-1">
          <div className="row  my-4">
            <div className="col-lg-12">
              {Object.values(order).map((p, i) => (
                <div className="card mb-4" key={i}>
                  <div className="card-header py-3">
                    <h5 className="mb-0">
                      Ngày đặt hàng: {dateFormat(p.updatedAt, "dd/mm/yyyy")}
                    </h5>
                  </div>
                  <div className="">
                    <div className="row">
                      {/* <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <div data-mdb-ripple-color="light">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"
                            className="w-50"
                            alt="Blue Jeans Jacket"
                          />
                        </div>
                      </div> */}
                      {p.products?.map((item, index) => (
                        <div
                          className="col-lg-5 col-md-6 mb-4 mb-lg-0"
                          key={index}>
                          <p>
                            <strong>{item.title}</strong>
                          </p>
                          <p>Số lượng: {item.count}</p>
                        </div>
                      ))}
                    </div>
                    <hr className="my-1" />
                  </div>
                  <div>{p.billTotal}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
export default History;
