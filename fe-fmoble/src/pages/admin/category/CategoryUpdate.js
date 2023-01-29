import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { getCategory, updateCategory } from "../../../functions/category";
import Spiner from "../../../component/spinner/spinner";

const CategoryUpdate = () => {
  const history = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const loadCategory = async () => {
      const { data } = await getCategory(slug);
      reset(data);
      console.log(data);
    };
    loadCategory();
  }, []);
  const onSubmit = async (data) => {
    setLoading(true);
    await updateCategory(slug, data, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        // setName("");
        toast.success(`"${res.data.name}" đã được cập nhật`);
        history("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  const categoryForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          {...register("name", { required: true })}
          // autoFocus
          required
        />
        <br />
        <button className="btn btn-outline-primary">cập nhật</button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <div>
              <Spiner />
            </div>
          ) : (
            <h4>Update category</h4>
          )}
          {categoryForm()}
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
