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
      {JSON.stringify(order.data)}
    </section>
  );
};
export default History;
