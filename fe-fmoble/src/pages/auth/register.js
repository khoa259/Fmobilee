import React from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { fireAuth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
// import { useHistory } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("dataa", data);
    const settings = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    // gửi email đến tài khoản đăng ký
    await sendSignInLinkToEmail(fireAuth, data.email, settings);

    alert(
      `Email is send to ${data.email}. Click the link to complete your registration`
    );
    window.localStorage.setItem("emailForRegistraion", data.email);
    reset();
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue="email" {...register("email")} />
        {errors.email && <p>invalid email address</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
