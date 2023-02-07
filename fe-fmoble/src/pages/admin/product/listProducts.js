import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button, Space } from "antd";

import { getProductsByCount, removeProduct } from "../../../functions/products";
import Spiner from "../../../component/spinner/spinner";
import { formatCash } from "../../../component/formatCash";

const ListProducts = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error list products", err);
      });
  };

  const handleRemove = (slug) => {
    if (window.confirm(`Bạn có muốn xóa? ${slug}`)) {
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data} đã được xóa`);
        })
        .catch((err) => {
          if (err.response?.status === 400) toast.error(err.response.data);
          console.log("lỗi", err);
        });
    }
  };

  return (
    <div>
      {loading ? (
        <Spiner />
      ) : (
        <h4 className="text-center">Danh Sách Sản Phẩm</h4>
      )}
      <div className="pt-5">
        <Link to="/admin/product">
          <button className="btn btn-outline-primary mb-4">
            <i className="fa-solid fa-plus"></i> Thêm sản phẩm
          </button>
        </Link>
      </div>
      <div>
        <h5>Có tổng {products.length} sản phẩm</h5>
      </div>
      <hr />
      <Table>
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Danh mục </th>
            <th>Số lượng</th>
            <th>Handle</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                <img
                  src={
                    product.images && product.images.length
                      ? product.images[0].url
                      : ""
                  }
                  alt={product.images}
                  style={{ height: "80px", objectFit: "cover" }}
                  className="m-2"
                />
              </td>
              <td>{product.title}</td>
              <td>{formatCash(`${product.price}`)} đ </td>
              <td>{product.category.name}</td>
              <td>
                {product.quantity > 0 ? (
                  product.quantity
                ) : (
                  <p className="text-red">hết hàng</p>
                )}
              </td>
              <td>
                <div className="">
                  <Link className="" to={`/admin/product/${product.slug}`}>
                    <Button type="primary">Sửa</Button>
                  </Link>

                  <br />
                  <Button
                    type="danger"
                    onClick={() => handleRemove(`${product.slug}`)}>
                    Xóa
                  </Button>

                  <br />
                  <Link to={`/${product.slug}`} target="_blank">
                    <i className="fa-regular fa-eye btn-eye"></i>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListProducts;
