import React, { useEffect, useState } from "react";
import { getAllBill } from "../../../functions/Bill";

const Order = () => {
  const [order, setOrder] = useState([]);
  console.log("order", order);
  useEffect(() => {
    getAllBill().then((res) => {
      console.log("res", res);
      setOrder(res.data);
    });
  }, []);
  return (
    <div>
      Order
      <h2>đơn hàng</h2>
      {order?.map((_) => (
        <div key={_._id}>{_.username}</div>
      ))}
    </div>
  );
};

export default Order;
