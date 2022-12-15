import React, { useEffect, useState } from "react";
import { getAllBill } from "../../../functions/Bill";

const Order = () => {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    getAllBill().then((res) => {
      setOrder(res);
      console.log("res", res);
    });
  });
  return (
    <div>
      Order
      <h2>đơn hàng</h2>
      {JSON.stringify(order)}
    </div>
  );
};

export default Order;
