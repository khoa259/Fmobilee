import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from "antd";

import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Table } from "react-bootstrap";
import Spiner from "../../../component/spinner/spinner";

const Category = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
        if (err.response.status === 400) return toast.error(err.response.data);
      });
  };
  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Bạn có chắc muốn xóa không")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(true);
          toast.error(`${res.data.name} đã được xóa thành công`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
  const CategoryForm = () => (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên danh mục</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            value={name}
            autoFocus
          />
          <br />
          <button className="btn btn-outline-primary" disabled={name === ""}>
            Thêm Mới
          </button>
        </div>
      </form>
      <input
        type="text"
        placeholder="tìm kiếm danh mục ...."
        className="form-control"
        onChange={handleSearchChange}
      />
    </div>
  );
  return (
    <div>
      <div className="text-center">
        {loading ? (
          <div>
            <Spiner />
          </div>
        ) : (
          <h4>Thêm mới danh mục </h4>
        )}
        {CategoryForm()}
        <hr />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên Danh Mục</th>
              <th>Xử lý</th>
            </tr>
          </thead>
          {categories.filter(searched(keyword)).map((c, index) => (
            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>{c.name}</td>
                <td>
                  {/* <Button type="danger" onClick={() => handleRemove(c.slug)}>
                    Xóa
                  </Button> */}
                  <Link to={`/admin/category/${c.slug}`}>
                    <Button type="primary">Sửa</Button>
                  </Link>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default Category;
