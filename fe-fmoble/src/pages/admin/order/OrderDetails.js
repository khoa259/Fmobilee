import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Button } from "antd";
import { getDetailBill } from "../../../functions/Bill";
import dateFormat from "dateformat";
import { formatCash } from "../../../component/formatCash";
import axios from "axios";

const OrderDetails = () => {
  const [order, setOrder] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getProudct = async () => {
      const { data } = await axios("http://localhost:8000/api/bill/" + id);
      setOrder(data);
    };
    getProudct();
  }, [id]);
  console.log(order);
  return <div>OrderDetails {id}</div>;
};

export default OrderDetails;
