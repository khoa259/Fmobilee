import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Button, Modal } from "antd";
import { useParams } from "react-router-dom";

import { updateProfileUser } from "../../functions/auth";
const Profile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  const { id } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const [open, setOpen] = useState(false);

  const onUpdate = (data) => {
    setValue("name", data.name);
    setValue("email", data.email);
    updateProfileUser(id, data);
  };

  return (
    <section className="container-profile">
      <div className="pt-2 text-center">
        <h4>Thông tin tài khoản</h4>
      </div>
      <Modal
        title="Cập nhật thông tin người dùng"
        centered
        open={open}
        footer={[
          <Button type="primary" htmlType="submit" form="myForm">
            Xác nhận
          </Button>,
        ]}
        onCancel={() => setOpen(false)}
        width={800}
      >
        <form onSubmit={handleSubmit(onUpdate)} id="myForm">
          <h4 className="text-center">Thông tin cá nhân</h4>
          {/* <FileUpload /> */}
          <label className="h5">Tên người dùng</label>
          <input
            placeholder="Tên người dùng"
            className="form-control"
            value={user?.name}
            {...register("name")}
          />
          <label className="h5">Email của bạn</label>
          <input
            className="form-control"
            placeholder="Tên người dùng"
            value={user?.email}
            {...register("email")}
          />
          <label className="h5">Số điện thoại</label>
          <input
            className="form-control"
            placeholder="Số điện thoại"
            value={user?.avatar}
            {...register("user")}
          />
          <label className="h5">Địa chỉ</label>
          <input
            className="form-control"
            placeholder="Địa chỉ"
            value={user?.address}
            {...register("address")}
          />
          ;
          {/* <Input placeholder="Basic usage" value={user?.email} />;
          <Input placeholder="Basic usage" value={user?.address} />; */}
          {/* <div className="text-center mt-2">
            <Button type="primary ">Lưu</Button>
          </div> */}
        </form>
      </Modal>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className=" mb-4">
              <div className="card-img py-4">
                <img
                  src="https://img.favpng.com/17/24/10/computer-icons-user-profile-male-avatar-png-favpng-jhVtWQQbMdbcNCahLZztCF5wk.jpg"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: 150 }}
                />
                <h5 className="my-3">{user?.name}</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="my-4">
              <div className="">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0 fw-normal">Họ tên</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0 fw-normal">{user.name}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Số điện thoại</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">096459596</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Địa chỉ</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user?.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span>
        <Button type="primary" onClick={() => setOpen(true)}>
          Thay đổi thông tin cá nhân
        </Button>
      </span>
    </section>
  );
};
export default Profile;
