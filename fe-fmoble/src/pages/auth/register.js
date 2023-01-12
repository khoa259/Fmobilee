import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm, handleSubmit } from "react-hook-form";

const Register = () => {
  const history = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history("/login");
  }, [user, history]);
  const onSubmit = async (data) => {
    // console.log("ENV --->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(data.email, config);
    toast.success(
      `Email đã được gửi đến ${data.email}. Hãy kiểm tra trong Email của bạn`
    );
    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", data.email);
    // clear state
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="span">Email của bạn</label>
      <input
        type="email"
        className="form-control"
        {...register("email", {
          required: true,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          },
        })}
        placeholder="Nhập Email của bạn"
      />
      {errors.email && (
        <p className="text-danger">Không đúng định dạng email</p>
      )}
      <Link className="mt-2">bạn đã có tài khoản</Link>
      <br />
      <button type="submit" className="btn btn-dark mt-2">
        Gửi
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>đăng ký tài khoản</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
