import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, images, price, slug, quantity, color } = product;
  const formatCash = (str) => {
    return str
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ".") + prev;
      });
  };
  return (
    <tbody>
      <tr>
        <td>
          <img
            src={images && images.length ? images[0].url : ""}
            style={{ height: "150px", objectFit: "cover" }}
            className="m-2"
          />
        </td>
        <td>{title}</td>
        <td>{formatCash(`${price}`)}</td>
        <td>{color}</td>
        <td>
          {quantity > 0 ? quantity : <p className="text-red">hết hàng</p>}
        </td>
        <td>
          <Link to={`/admin/product/${slug}`}>Sửa</Link>
          <button onClick={() => handleRemove(slug)}> Xóa</button>
        </td>
      </tr>
    </tbody>
  );
};

export default AdminProductCard;
