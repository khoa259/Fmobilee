import { Button, Modal, Result } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "axios";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalFail, setisModalFail] = useState(false);
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [userUpdate, setUserUpdate] = useState([]);
  const [callApi, setCallApi] = useState(Math.random());

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/my-profile/${id}`
      );
      setUserUpdate(data);
      console.log(`userUpdate => ${JSON.stringify(userUpdate, null, 2)}`);
    };
    getUser();
  }, [id, callApi]);

  const onUpdate = async (data) => {
    setValue("name", data.name);
    setValue("email", data.email);
    const status = await updateProfileUser(id, data);
    if (status === 200) {
      showModal();
      setOpen(false);
      setTimeout(() => {
        setIsModalOpen(false);
        setCallApi(Math.random());
      }, 2000);
    } else {
      showModalFail();
    }
  };
  const showModalFail = () => {
    setisModalFail(true);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOkFail = () => {
    setisModalFail(false);
  };

  const handleCancelFail = () => {
    setisModalFail(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal open={isModalOpen} onCancel={handleCancel}>
        <Result
          status="success"
          title="Thông tin cá nhân của bạn đã được cập nhật thành công"
        />
        ;
      </Modal>
      <Modal open={isModalFail} onCancel={handleCancelFail}>
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
          extra={
            <Link to={"/"}>
              <Button type="primary">Back Home</Button>
            </Link>
          }
        />
      </Modal>
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
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={800}>
          <form onSubmit={handleSubmit(onUpdate)} id="myForm">
            <h4 className="text-center">Thông tin cá nhân</h4>
            {/* <FileUpload /> */}
            <label className="h5">Tên người dùng</label>
            <input
              placeholder="Tên người dùng"
              className="form-control"
              {...register("name")}
            />
            <label className="h5">Email của bạn</label>
            <input
              className="form-control"
              placeholder="Tên người dùng"
              {...register("email")}
            />
            <label className="h5">Số điện thoại</label>
            <input
              className="form-control"
              placeholder="Số điện thoại"
              {...register("user")}
            />
            <label className="h5">Địa chỉ</label>
            <input
              className="form-control"
              placeholder="Địa chỉ"
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
                    src={user?.picture}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: 150 }}
                  />
                  <h5 className="my-3">{userUpdate?.name}</h5>
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
                      <p className="text-muted mb-0 fw-normal">
                        {userUpdate.name}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userUpdate.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Số điện thoại</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userUpdate.phone}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Địa chỉ</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userUpdate?.address}</p>
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
    </>
  );
};
export default Profile;
