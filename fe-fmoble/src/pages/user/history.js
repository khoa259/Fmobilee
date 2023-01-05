import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

import { getUserOrders } from "../../functions/user";
const History = () => {
  const [order, setOrder] = useState([]);
  // const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    getUserOrders(getToken).then((res) => {
      console.log("orderBy", JSON.stringify(res.data, null, 4));
      setOrder(res);
    });
  }, []);
  console.log(order);
  return (
    <section>
      <div className="container">
        <h3>Đơn Hàng Của Tôi</h3>
      </div>
      <div>
        <table className="table my-3">
          <thead>
            <tr>
              <th className="row">Ngày mua: 20/12/2023</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="row">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw0LDGrFJFTbhGUuXIf_PQ3TcQsThG8d-ZSA&usqp=CAU"
                  className="img-thumbnail"
                  width={150}
                />
                <span>Iphone 12 promax</span>
                <span>x2</span>
              </td>
              <td>02</td>
              <td>Otto</td>
            </tr>
            <tr className="row">
              <td>Tổng tiền: 23.000.000 đ</td>
            </tr>
          </tbody>
        </table>
        <hr />
      </div>
    </section>
  );
};
export default History;
